const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRouters = require("./routes/cartRouters");
const orderRouter = require("./routes/orderRouter");
const { authenticateJWT } = require("./middewares/authenticateJWT");
const server = express();
const port = 3000;

connectDB();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);

// Routes
server.use("/product", productRoutes);
server.use("/auth", authRoutes);
server.use(authenticateJWT);
server.use("/cart", cartRouters);
server.use("/order", orderRouter);

server.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
