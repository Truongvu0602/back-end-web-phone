const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

// Import models
const User = require("./userModel");
const Product = require("./productsModel");
const Cart = require("./cartModel");

// Define relationships
User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Product.hasMany(Cart, { foreignKey: "productId", onDelete: "CASCADE" });

Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
};
