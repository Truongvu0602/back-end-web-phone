const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Product = require("./productsModel"); // Import product model
const Order = require("./orderModel"); // Import order model

const OrderItem = sequelize.define(
  "order_item",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    orderId: { type: DataTypes.INTEGER, allowNull: false }, // Liên kết với đơn hàng
    productId: { type: DataTypes.INTEGER, allowNull: false }, // Liên kết với sản phẩm
    quantity: { type: DataTypes.INTEGER, allowNull: false }, // Số lượng sản phẩm trong đơn hàng
    price: { type: DataTypes.FLOAT, allowNull: false }, // Giá sản phẩm khi đặt hàng
  },
  {
    timestamps: true, // Tạo trường createdAt, updatedAt
  }
);

// Mối quan hệ với Order và Product
OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = OrderItem;
