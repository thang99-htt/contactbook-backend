const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/register")
    .post(users.register);

router.route("/login")
    .post(users.login);

router.route("/logout")
    .post(users.logout);

module.exports = router;