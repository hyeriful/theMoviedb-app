const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");
const { auth } = require("../middleware/auth");

router.get("/number/:moiveId", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res
      .status(200)
      .json({ success: true, favoriteNumber: info.length, information: info });
  });
});

module.exports = router;
