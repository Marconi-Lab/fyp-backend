const express = require('express');
const router = express.Router();
const authn = require("../controllers/");

router.post("/signup", authn.signup);

module.exports = router;