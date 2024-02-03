const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    color: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = User = model("product", productSchema);
