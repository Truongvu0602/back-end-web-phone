const sharp = require("sharp");
const path = require("path");
const fs = require("fs"); // Để xóa file tạm

// Middleware này vẫn dành riêng cho việc xử lý hình ảnh
// nhưng sử dụng quy tắc đặt tên file chung hơn cho file đầu ra.
exports.resizeImage = async (req, res, next) => {
  // 1. Kiểm tra xem middleware upload có gửi file không
  if (!req.file) {
    return next(); // Nếu không có file, đi tiếp middleware tiếp theo
  }

  // 2. Lưu đường dẫn file tạm để dùng cho Sharp và xóa sau này
  const tempFilePath = req.file.path;

  try {
    // 3. Tạo tên file cuối cùng (đã xử lý) - Theo mẫu image-timestamp-random.ext
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Xác định định dạng đầu ra (từ cấu hình Sharp) - ở đây là 'jpeg'
    const ext = ".jpeg";
    const finalFilename = `image-${uniqueSuffix}${ext}`;

    // 4. Gắn tên file cuối cùng vào req để controller có thể lấy và lưu vào DB
    req.file.processedFilename = finalFilename;

    // 5. Định nghĩa đường dẫn đầy đủ để lưu file cuối cùng
    const finalDirectory = path.join(__dirname, "..", "public", "uploads");
    const finalFilePath = path.join(finalDirectory, finalFilename);

    // 6. Sử dụng Sharp để đọc file TẠM từ đĩa, xử lý và lưu vào vị trí CUỐI CÙNG
    await sharp(tempFilePath) // Đọc từ đường dẫn file tạm
      .resize(1000) // Resize chiều rộng xuống 1000px
      .toFormat("jpeg") // Chuyển định dạng sang outputFormat //png, jpeg,...
      .jpeg({ quality: 80 }) // Đặt chất lượng (nếu là JPEG)
      .toFile(finalFilePath); // Lưu vào đường dẫn cuối cùng

    // 7. XÓA FILE TẠM sau khi đã xử lý và lưu thành công file cuối cùng
    // Sử dụng fs.unlink (non-blocking) để xóa file tạm
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        // Chỉ log lỗi nếu không xóa được file tạm, không nên chặn request
        console.error(`Lỗi khi xóa file tạm ${tempFilePath}:`, err);
      } else {
        console.log(`Đã xóa file tạm: ${tempFilePath}`);
      }
    });

    // 8. Chuyển sang middleware/controller tiếp theo
    next();
  } catch (err) {
    console.error("Lỗi khi xử lý ảnh bằng Sharp:", err);

    // Cố gắng xóa file tạm ngay cả khi xảy ra lỗi xử lý ảnh
    // Quan trọng để tránh để lại file rác trong thư mục /temp
    fs.unlink(tempFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(
          `Lỗi khi xóa file tạm ${tempFilePath} sau khi xử lý lỗi:`,
          unlinkErr
        );
      } else {
        console.log(`Đã xóa file tạm sau khi xử lý lỗi: ${tempFilePath}`);
      }
    });

    next(err);
  }
};

exports.resizeImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  req.processedFiles = [];

  const finalDirectory = path.join(__dirname, "..", "public", "uploads");

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const tempFilePath = file.path;

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const finalFilename = `image-${uniqueSuffix}.jpeg`;
        const finalFilePath = path.join(finalDirectory, finalFilename);

        // Resize và lưu file
        await sharp(tempFilePath)
          .resize(1000)
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toFile(finalFilePath);

        // Xóa file tạm
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error(`❌ Lỗi xoá file tạm: ${tempFilePath}`, err);
          else console.log(`🧹 Đã xoá file tạm: ${tempFilePath}`);
        });

        // Gắn tên file đã xử lý
        req.processedFiles.push(finalFilename);
      })
    );

    next();
  } catch (err) {
    console.error("❌ Lỗi xử lý ảnh:", err);
    next(err);
  }
};
