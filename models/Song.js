const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  duration: {
    type: String
  },
  feat: {
    type: String
  },
  youtubeId: {
    type: String
  }
});

module.exports = mongoose.model("song", SongSchema);
