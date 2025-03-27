const express = require("express");
const { check } = require("express-validator");
const { register, login } = require("../controllers/authController");

const router = express.Router();

//  đăng ký
router.post(
  "/register",
  [
    check("email", "Email không hợp lệ").isEmail(),
    check("pass", "Mật khẩu phải có ít nhất 6 ký tự").isLength({ min: 6 }),
    check("userName", "Tên người dùng không được để trống").not().isEmpty(),
  ],
  register
);
//  đăng nhập
router.post(
  "/login",
  [
    check("email", "Email không hợp lệ").isEmail(),
    check("pass", "Mật khẩu không được để trống").not().isEmpty(),
  ],
  login
);
module.exports = router;
