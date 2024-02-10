const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ahmed:ahmed@cluster0.ogj9fs7.mongodb.net/"
    );
    console.log(" database connected");
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = connectDB;
