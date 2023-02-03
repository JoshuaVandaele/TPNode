const express = require("express");
const router = express.Router({ mergeParams: true });
const { createWatchlist, findWatchlist, editWatchlist } = require("../controllers/watchlist.js");

router.get("/create", createWatchlist);
router.get("/find", findWatchlist);
// router.get("/edit", editWatchlist);

module.exports = router;
