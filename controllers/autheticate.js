const User = require("../models/model");
const jwt = require("jsonwebtoken");

exports.token = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication Failed");
    }
    const { userId, exp } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    //Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res
        .status(401)
        .json({ error: "JWT has expired, please login to obtain a new one" });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } catch (err) {
    res.status(401).json({
      msg: err,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    // get user
    const user = res.locals.loggedInUser;

    // check that user role is admin
    // throw error is user is not admin
    if (user.role != "admin") throw new Error("Unauthorized, only admins");

    next();
  } catch (err) {
    res.status(401).json({
      msg: `${err}`,
    });
  }
};
