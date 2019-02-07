const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    playlistIndex: Number,
    appleMusicCatalogId: Number,
    genreCode: String,
    artist: String,
    songName: String,
    songUrl: String,
  }
);

module.exports = mongoose.model("Song", SongSchema);
