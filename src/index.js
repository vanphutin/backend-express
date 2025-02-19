require("dotenv").config({
  path: `./src/.env.${process.env.NODE_ENV || "development"}`,
});

const express = require("express");
const cors = require("cors");
const database = require("./config/database.conf");
const api_router_v1 = require("./apis/v1/routers/index.router");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware requestLogger
const {
  requestLogger,
  errorLogger,
} = require("./apis/v1/middlewares/logger.middleware");
app.use(requestLogger);
app.use(errorLogger);

// Cấu hình CORS
const whitelist = ["http://localhost:3000", "http://localhost:4000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware xử lý JSON và URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kiểm tra server
app.get("/", (req, res) => res.send("Server is running!"));

// Routes
api_router_v1(app);

// Kết nối đến Database và khởi động server
database.getConnection((error, connection) => {
  if (error) {
    console.error("❌ Lỗi kết nối database:", error.message);
    process.exit(1);
  }

  console.log(
    `✅ Kết nối MySQL thành công! Host: ${database.config.connectionConfig.host}, Port: ${database.config.connectionConfig.port}`
  );
  connection.release();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server đang chạy trên port ${PORT} | Environment: ${process.env.NODE_ENV}`
    );
  });
});
