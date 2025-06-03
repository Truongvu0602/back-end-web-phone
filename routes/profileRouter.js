const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");
const upload = require("../middewares/upload");
const imageProcessingMiddleware = require("../middewares/imageProcessingMiddleware");
router.get("/getProfile", getProfile);
router.put(
  "/updateProfile",
  upload.uploadSingleImage("image"),
  imageProcessingMiddleware.resizeImage,
  updateProfile
);

module.exports = router;
