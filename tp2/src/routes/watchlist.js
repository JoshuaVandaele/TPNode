const express = require("express");
const router = express.Router({ mergeParams: true });
const { createWatchlist, findWatchlist, addMovieToWatchlist, removeMovieFromWatchlist, deleteWatchlist, findMovies, listWatchlists } = require("../controllers/watchlist.js");

router.get("/create", createWatchlist);
router.get("/find", findWatchlist);
router.get("/delete", deleteWatchlist);
router.get("/list", listWatchlists);

router.get("/addmovie", addMovieToWatchlist);
router.get("/removemovie", removeMovieFromWatchlist);
router.get("/listmovies", findMovies);

module.exports = router;
