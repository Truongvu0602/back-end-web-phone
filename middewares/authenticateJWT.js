const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập!" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ!" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateJWT };
