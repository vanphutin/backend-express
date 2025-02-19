const fs = require("fs");
const path = require("path");

// Xác định đường dẫn thư mục logs và file logs
const logDir = path.join(__dirname, "../../../logs");
const logFilePath = path.join(logDir, "requests.log");
const errorLogFilePath = path.join(logDir, "errors.log");

// Kiểm tra xem thư mục logs có tồn tại không, nếu không thì tạo mới
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Tạo file stream để ghi log (tốt hơn appendFileSync)
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });
const errorLogStream = fs.createWriteStream(errorLogFilePath, { flags: "a" });

// Middleware để log request
const requestLogger = (req, res, next) => {
  const startTime = Date.now(); // Lưu thời gian bắt đầu

  res.on("finish", () => {
    const responseTime = Date.now() - startTime; // Tính thời gian xử lý
    const logData = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    }
    - Status: ${res.statusCode} - Response Time: ${responseTime}ms
    - IP: ${req.ip} - User-Agent: ${req.headers["user-agent"]}
    - Body: ${JSON.stringify(req.body)} - Query: ${JSON.stringify(req.query)}
    - Params: ${JSON.stringify(req.params)}\n`;

    logStream.write(logData);
    console.log(
      `✅ Ghi log: ${req.method} ${req.originalUrl} (${res.statusCode})`
    );
  });

  next();
};

// Middleware để log lỗi
const errorLogger = (err, req, res, next) => {
  const logError = `[${new Date().toISOString()}] ERROR ${req.method} ${
    req.originalUrl
  }
    - Status: ${res.statusCode || 500}
    - Message: ${err.message}
    - Stack: ${err.stack}\n`;

  errorLogStream.write(logError);
  console.error("❌ Lỗi API:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { requestLogger, errorLogger };
