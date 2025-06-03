const { User } = require("../model");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId, {
      attributes: ["userName", "email", "avatar"], // Thêm avatar ở đây
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    return res.status(200).json({
      userName: user.userName,
      email: user.email,
      avatar: user.avatar, // Trả về avatar luôn
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log("Dữ liệu nhận từ frontend:", req.body); // <-- thêm dòng này để log dữ liệu
    console.log(`đay là req ${req.file.processedFilename}`);

    const userId = req.user.userId;
    const { userName, email } = req.body;

    const user = await User.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    user.userName = userName;
    user.email = email;
    if (req.file?.processedFilename) {
      user.avatar = req.file?.processedFilename;
    }
    await user.save();

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi cập nhật profile:", error);
    return res.status(500).json({ message: "Lỗi server khi cập nhật" });
  }
};

module.exports = { updateProfile, getProfile };
