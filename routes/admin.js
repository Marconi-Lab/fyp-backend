const express = require('express');
const router = express.Router({mergeParams: true});
const Authn = require("../controllers/authetication");

router.post('/signup', Authn.signup)

module.exports = router;