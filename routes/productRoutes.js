const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductsByCategory,
  getProductDetail,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:category", getProductsByCategory);
router.get("/detail/:id", getProductDetail);

module.exports = router;
