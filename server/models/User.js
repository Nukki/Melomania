const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    score: Number,
  }
);

module.exports = mongoose.model("User", UserSchema);
