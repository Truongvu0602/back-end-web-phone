const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/:id", removeFromCart);
module.exports = router;
