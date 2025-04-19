const express = require("express");
const router = express.Router();

// Import controller
const {
  createOrder,
  getCart,
  getOrders,
} = require("../controllers/oderController");

// Route tạo đơn hàng
router.post("/create", createOrder);

// // Route lấy danh sách đơn hàng của người dùng
router.get("/getOder", getCart);

router.get("/getOderProduct", getOrders);

module.exports = router;
