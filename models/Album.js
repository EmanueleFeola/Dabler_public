const mongoose = require("mongoose");

const AlbumSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  icon: {
    type: String,
    default:
      "https://www.pinclipart.com/picdir/middle/164-1647836_album-collection-list-music-playlist-songs-icon-gallery.png"
  }
});

module.exports = mongoose.model("album", AlbumSchema);
