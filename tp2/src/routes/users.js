const express = require("express");
const router = express.Router();
const { createUser, findUser } = require("../controllers/users");

router.get("/create", createUser);
router.get("/find", findUser);

module.exports = router;
