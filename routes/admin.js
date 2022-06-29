const express = require('express');

const controller = require("../controllers/admin");

const router = express.Router({mergeParams: true});

router.get("/", controller.sampleAdmin);


module.exports = router;