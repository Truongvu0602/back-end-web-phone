const { Order, OrderItem, Cart, Product } = require("../model");

const getCart = async (req, res) => {
  try {
    console.log(req.user);

    const userId = req.user.userId;

    const cartItems = await Cart.findAll({
      where: { userId },
      include: Product,
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    return res.status(200).json({
      cartItems,
    });
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy giỏ hàng" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { fullName, email, shippingAddress, phoneNumber, paymentMethod } =
      req.body;
    console.log("BODY từ frontend:", req.body);

    const userId = req.user.userId;

    if (
      !fullName ||
      !email ||
      !shippingAddress ||
      !phoneNumber ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Thiếu thông tin thanh toán" });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: Product,
    });

    if (!cartItems.length) {
      return res
        .status(400)
        .json({ message: "Giỏ hàng trống, không thể tạo đơn hàng" });
    }

    // Tính tổng tiền (totalAmount)
    const totalAmount = cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const newOrder = await Order.create({
      userId,
      fullName,
      email,
      shippingAddress,
      phoneNumber,
      paymentMethod,
      totalAmount,
      status: "pending",
    });

    const orderItems = cartItems.map((item) => ({
      orderId: newOrder.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    console.log("Data to insert into order_items:", orderItems);

    await OrderItem.bulkCreate(orderItems);

    await Cart.destroy({ where: { userId } });

    return res.status(201).json({
      message: "Đơn hàng đã được tạo thành công",
      order: newOrder,
      orderItems,
    });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo đơn hàng" });
  }
};
const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy userId từ token hoặc session

    // Lấy tất cả các đơn hàng của người dùng, kèm theo các item trong đơn hàng
    const orders = await Order.findAll({
      where: { userId },
      include: {
        model: OrderItem,
        include: {
          model: Product, // Lấy thông tin sản phẩm của mỗi item
        },
      },
    });

    // Kiểm tra nếu không có đơn hàng nào
    if (orders.length === 0) {
      return res.status(404).json({ message: "Không có đơn hàng nào" });
    }

    // Trả về danh sách đơn hàng kèm thông tin chi tiết
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Lỗi lấy đơn hàng:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy đơn hàng" });
  }
};
module.exports = { getCart, createOrder, getOrders };
