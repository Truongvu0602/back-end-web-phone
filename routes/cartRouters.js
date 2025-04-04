const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/:id", removeFromCart);
router.put("/cart/:id/quantity", updateCartQuantity);
module.exports = router;
