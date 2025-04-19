const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

// Import models
const User = require("./userModel");
const Product = require("./productsModel");
const Cart = require("./cartModel");
const Order = require("./orderModel");
const OrderItem = require("./orderItemModel");

// Define relationships
User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Product.hasMany(Cart, { foreignKey: "productId", onDelete: "CASCADE" });

Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });

// Define relationships for Order
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

// Define relationships for OrderItem
Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", onDelete: "CASCADE" });

Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  Order,
  OrderItem,
};
