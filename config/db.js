const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("backend", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true }); // `alter: true` đảm bảo cập nhật thay đổi nếu có
    console.log("✅ Đồng bộ hóa mô hình với cơ sở dữ liệu!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { sequelize, connectDB };
