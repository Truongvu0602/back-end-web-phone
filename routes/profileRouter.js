const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

router.get("/getProfile", getProfile);
router.put("/updateProfile", updateProfile);

module.exports = router;
