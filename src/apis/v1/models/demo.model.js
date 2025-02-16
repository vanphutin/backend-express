const db = require("../../../config/database.conf");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

module.exports.Demo = {
  // get all
  getDemoAll: async () => {
    const sql = "SELECT * FROM users";
    try {
      const result = await query(sql);
      // Kiểm tra và trả về kết quả đúng
      return result;
    } catch (error) {
      console.error("Error counting users:", error.message);
      throw error;
    }
  },
};
