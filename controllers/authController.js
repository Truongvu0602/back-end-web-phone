const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, pass, userName } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: "Email đã tồn tại!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    user = await User.create({
      email,
      pass: hashedPassword,
      userName,
    });

    return res.status(201).json({ msg: "Đăng ký thành công!", user });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server");
  }
};

exports.login = async (req, res) => {
  // Kiểm tra lỗi từ express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, pass } = req.body;
  console.log(email);
  console.log(pass);

  try {
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "Email không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mật khẩu không đúng!" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, userName: user.userName },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ msg: "Đăng nhập thành công!", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi Server");
  }
};
