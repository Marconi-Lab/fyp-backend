const express = require('express');
const { allowIfLoggedin } = require('../controllers/');
const router = express.Router();
const authn = require("../controllers/");
const token = require('../controllers/auth')
const access = require('../controllers/access')

router.post("/signup", authn.signup);

router.post("/login", authn.login);

// router.get("/user/:userId", authn.getUser);
router.get("/user/:userId", token.auth , access.allowIfLoggedin, authn.getUser);

router.get("/users", token.auth, token.isAdmin, access.allowIfLoggedin, access.grantAccess("readAny", "profile"), authn.getUsers);

// router.put("/user/:userId", token.auth, allowIfLoggedin, access.grantAccess, updateUser)
router.put("/user/:userId", authn.updateUser)

module.exports = router;