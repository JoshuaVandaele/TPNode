const express = require("express");
const router = express.Router();
const { createUser, findUser, editUser } = require("../controllers/users");

router.get("/create", createUser);
router.get("/find", findUser);
router.get("/edit", editUser);

module.exports = router;
