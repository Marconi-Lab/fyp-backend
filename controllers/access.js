const { roles } = require("../roles/role");

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    // console.log(user);
    if (!user) {
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    }
    req.user = user;
    // console.log(req.user)
    next();
  } catch (error) {
    next(error);
  }
};

// responsible for actions a role can perform ie read ,update, delete
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
