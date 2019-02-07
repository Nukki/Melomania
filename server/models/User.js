const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    score: Number,
  }
);

module.exports = mongoose.model("User", UserSchema);
