const express = require("express");
const router = express.Router();
const operation = require("../controllers/");
const auth = require("../controllers/autheticate");
const access = require("../controllers/access");

router.post("/signup", operation.signup);

router.post("/login", operation.login);

router.get(
  "/user/:userId",
  auth.token,
  access.allowIfLoggedin,
  operation.getUser
);

router.get(
  "/users",
  auth.token,
  auth.isAdmin,
  access.allowIfLoggedin,
  access.grantAccess("readAny", "profile"),
  operation.getUsers
);

router.put(
  "/user/:userId",
  auth.token,
  auth.isAdmin,
  access.allowIfLoggedin,
  access.grantAccess("updateAny", "profile"),
  operation.updateUser
);

router.delete(
  "/user/:userId",
  auth.token,
  auth.isAdmin,
  access.allowIfLoggedin,
  access.grantAccess("deleteAny", "profile"),
  operation.deleteUser
);

module.exports = router;
