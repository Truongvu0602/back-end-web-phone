const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const server = express();
const port = 3000;

connectDB();

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Routes
server.use("/", productRoutes);
server.use("/auth", authRoutes);

server.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
