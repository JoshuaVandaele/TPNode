const express = require("express");
const router = express.Router({ mergeParams: true });
const { createWatchlist, findWatchlist, addMovieToWatchlist, removeMovieFromWatchlist, deleteWatchlist } = require("../controllers/watchlist.js");

router.get("/create", createWatchlist);
router.get("/find", findWatchlist);
router.get("/add", addMovieToWatchlist);
router.get("/remove", removeMovieFromWatchlist);
router.get("/delete", deleteWatchlist);

module.exports = router;
