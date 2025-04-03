const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./userModel");
const Product = require("./productsModel");

const Cart = sequelize.define(
  "cart",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "productId"], // Đảm bảo một user không thêm cùng một sản phẩm nhiều lần
      },
    ],
    timestamps: false,
  }
);

Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.hasMany(Product, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = Cart;
