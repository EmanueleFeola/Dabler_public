const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator/check");

const Album = require("../models/Album");

// @route   GET api/albums
// @desc    Get all albums
// @access  Public
router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().sort({
      date: -1
    });
    res.json(albums);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/albums/last
// @desc    Get last album
// @access  Public
router.get("/last", async (req, res) => {
  try {
    const albums = await Album.find().sort({
      date: -1
    });
    if (albums.length !== 0) res.json(albums[0]);
    else res.json(albums);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/albums
// @desc    Add new album
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

    const { title, date, icon } = req.body;

    try {
      let newAlbum = await Album.findOne({ title });

      if (newAlbum) {
        res.status(400).json({ msg: "Album already exists" });
      }

      newAlbum = new Album({
        title,
        date,
        icon
      });

      const album = await newAlbum.save();
      res.json(album);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { title, date, icon } = req.body;

  // Build contact object
  const albumFields = {};

  if (title) albumFields.title = title;
  if (icon) albumFields.icon = icon;
  if (date) albumFields.date = date;

  try {
    let album = await Album.findById(req.params.id);

    if (!album) return res.status(404).json({ msg: "Album not found" });

    album = await Album.findByIdAndUpdate(
      req.params.id,
      { $set: albumFields },
      { new: true }
    );

    res.json(album);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);

    if (!album) return res.status(404).json({ msg: "Album not found" });

    await Album.findByIdAndRemove(req.params.id);

    res.json({ msg: "Album removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
