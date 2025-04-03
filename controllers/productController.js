const Product = require("../model/productsModel");
const { Op } = require("sequelize");

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("❌ Lỗi lấy sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lọc sản phẩm theo danh mục
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    let products;

    if (category === "All") {
      products = await Product.findAll();
    } else {
      products = await Product.findAll({
        where: {
          category: {
            [Op.like]: `%${category}%`,
          },
        },
      });
    }

    res.json(products);
  } catch (error) {
    console.error("❌ Lỗi lọc sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy chi tiết sản phẩm theo ID
const getProductDetail = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Lỗi lấy sản phẩm theo ID:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductDetail,
};
