const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  getProductDetail,
  getCartById,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:category", getProductsByCategory);
router.get("/detail/:id", getProductDetail);
router.get("/cart/:id", getCartById);
module.exports = router;
