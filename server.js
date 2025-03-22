const express = require("express");
const server = express();
const port = 3000;
const { connectDB } = require("./config/db");
const Product = require("./model/productsModel");
const cors = require("cors");
const { Op } = require("sequelize");

connectDB();
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

// API: Lấy tất cả sản phẩm
server.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Lỗi lấy dữ liệu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// API: Lọc sản phẩm theo danh mục
server.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    console.log(category);

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
    console.error("Lỗi lọc sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
//
server.get("/detail/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.json(product);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
//
server.listen(port, () => {
  console.log(`Server chạy trên port ${port}`);
});
