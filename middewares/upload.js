const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  // 1. Nơi lưu file TẠM THỜI
  destination: (req, file, cb) => {
    // Đảm bảo thư mục tồn tại (có thể kiểm tra và tạo nếu cần)
    const tempPath = path.join(__dirname, "..", "public", "temp");
    cb(null, tempPath); // Lưu vào thư mục src/public/temp
  },
  // 2. Đặt tên file TẠM THỜI (tránh trùng lặp, bảo mật)
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    // Ví dụ: image-1678886400000-123456789.jpeg
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

// Tạo File Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

// Khởi tạo Multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

// Export Middleware
// Hàm này nhận tên field làm tham số và trả về middleware tương ứng
exports.uploadSingleImage = (fieldName) => upload.single(fieldName);
exports.uploadMultipleImages = (fieldName, maxCount = 10) =>
  upload.array(fieldName, maxCount);
