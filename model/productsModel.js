const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Product = sequelize.define(
  "products",
  {
    // Model attributes are defined here
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    short_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    long_desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img3: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img4: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = Product;


