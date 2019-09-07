const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator/check");

const Song = require("../models/Song");

// @route   GET api/songs
// @desc    Get all songs of an album. If album is not given, return all
// @access  Public
router.get("/", async (req, res) => {
  const { album } = req.query;

  try {
    let songs;

    if (album !== null && album !== undefined) {
      songs = await Song.find({ album: album }).sort({
        date: -1
      });
    } else {
      songs = await Song.find().sort({
        date: -1
      });
    }
    res.json(songs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/songs
// @desc    Add new song
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, duration, feat, album, youtubeId } = req.body;

    try {
      let newSong = await Song.findOne({ title });

      if (newSong) {
        res.status(400).json({ msg: "Song already exists" });
      }

      newSong = new Song({
        title,
        album,
        duration,
        feat,
        youtubeId
      });

      const song = await newSong.save();
      res.json(song);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/songs/:id
// @desc    Update song
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { title, album, duration, feat, youtubeId } = req.body;

  // Build contact object
  const songFields = {};

  if (title) songFields.title = title;
  if (album) songFields.album = album;
  if (duration) songFields.duration = duration;
  if (feat) songFields.feat = feat;
  if (youtubeId) songFields.youtubeId = youtubeId;

  try {
    let song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ msg: "Song not found" });

    song = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: songFields },
      { new: true }
    );

    res.json(song);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/songs/:id
// @desc    Delete song
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ msg: "Song not found" });

    await Song.findByIdAndRemove(req.params.id);

    res.json({ msg: "Song removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
