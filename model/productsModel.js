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
    timestamps: true, // ⬅️ Nếu không muốn `createdAt` & `updatedAt`, đặt là `false`
  }
);

module.exports = Product;

// const { DataTypes, Sequelize } = require("sequelize");
// const { sequelize } = require("../config/db"); // Không cần destructuring

// // const Product = sequelize.define(
// //   "Product", // Tên model (số ít, Sequelize tự đổi thành `products`)
// //   {
// //     category: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     name: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     price: {
// //       type: DataTypes.INTEGER,
// //       allowNull: false,
// //     },
// //     short_desc: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     long_desc: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     img1: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     img2: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     img3: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //     img4: {
// //       type: DataTypes.STRING,
// //       allowNull: false,
// //     },
// //   },
// //   {
// //     timestamps: true, // Nếu không cần `createdAt` & `updatedAt`, đổi thành `false`
// //   }
// // );
// const Product = sequelize.define(
//   "Product",
//   {
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     short_desc: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     long_desc: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     img1: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     img2: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     img3: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     img4: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Set giá trị mặc định
//     },
//     updatedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal(
//         "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
//       ),
//     },
//   },
//   {
//     timestamps: true, // Đảm bảo Sequelize tự động thêm createdAt và updatedAt
//   }
// );

// module.exports = Product; // Đúng tên model
