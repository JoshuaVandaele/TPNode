const express = require("express");
const router = express.Router();
const { createUser, findUser, editUser, listUsers } = require("../controllers/users");

router.get("/create", createUser);
router.get("/find", findUser);
router.get("/edit", editUser);
router.get("/list", listUsers);

module.exports = router;
