const express = require('express');
const { allowIfLoggedin } = require('../controllers/');
const router = express.Router();
const authn = require("../controllers/");
const token = require('../controllers/auth')

router.post("/signup", authn.signup);

router.post("/login", authn.login);

// router.get("/user/:userId", authn.getUser);

router.get("/user/:userId", token.auth , authn.allowIfLoggedin, authn.getUser)

module.exports = router;