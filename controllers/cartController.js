const Cart = require("../model/cartModel");
const Product = require("../model/productsModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    console.log("Product ID:", productId);
    console.log("User ID:", userId);
    console.log("Quantity:", quantity);

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      console.log("Cập nhật giỏ hàng:", cartItem.toJSON());
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
      console.log("Thêm vào giỏ hàng:", cartItem.toJSON());
    }

    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    console.log("Request User Object:", req.user);

    const userId = req.user.userId;
    console.log(1);

    console.log("User ID:", userId);
    const cart = await Cart.findAll({
      where: { userId },
      include: [
        { model: Product, attributes: ["id", "name", "price", "img1"] },
      ],
    });
    console.log("Cart data:", cart);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ!" });
    }

    await cartItem.destroy();
    res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
