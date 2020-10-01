const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");
const { auth } = require("../middleware/auth");

router.get("/number/:movieId", (req, res) => {
  Favorite.find({ movieId: req.params.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.get("/check/:movieId", auth, (req, res) => {
  //내가 이 영화를 Favorite리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({ movieId: req.params.movieId, userFrom: req.user._id }).exec(
    (err, info) => {
      if (err) return res.status(400).send(err);

      let result = false;
      if (info.length !== 0) return (resul = true);

      res.status(200).json({ success: true, isFavorite: info.length });
    }
  );
});

router.post("/addToFavorite", auth, (req, res) => {
  req.body.userFrom = req.user._id;
  const favorite = new Favorite(req.body);

  favorite.save((err, dov) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.get("/removeFromFavorite/:movieId", auth, (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.params.movieId,
    userFrom: req.user._id,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

router.get("/getFavoriteMovie", auth, (req, res) => {
  Favorite.find({ userFrom: req.user._id }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
