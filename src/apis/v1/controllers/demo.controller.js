const { Demo } = require("../models/demo.model");

module.exports.getAllDemos = async (req, res) => {
  try {
    const demo = await Demo.getDemoAll(); // Sửa thành await
    return res.status(200).json({
      status: "success",
      data: demo,
    });
  } catch (error) {
    console.error("Error in getAllDemos:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
