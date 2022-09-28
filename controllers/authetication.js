const User = require("../models/model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {roles} = require("../roles/role");

async function hashPassword(password){
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword){
    return await bcrypt.compare(plainPassword, hashedPassword)
}


// -----------------------------------------------signup-----------------------------------------------------------
exports.signup = async (req, res, next) => {
    try {
        //capture user details
        const { email, password, role} = req.body;

        //check if user already has an account
        const emailExist = await User.findOne({email});
        if (emailExist) return res.json({ message: "Email already exists" });

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || "basic"
        });
        
        //create an access token for the user
        const accessToken = jwt.sign({ userId: newUser._id }, `${process.env.JWT_SECRET_KEY}`, {
            expiresIn: 3600,
        });

        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            message: "You have signed up successfully"
        });
    } catch(error){
        next(error);
        console.log("Error detected");
    }
}


// -------------------------------------------------------login----------------------------------------------------
exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        //check if email is exists
        // if (!user) throw new Error("Email doesn't exist");
        if (!user) return res.json({ message: "Email doesn't exist" });

        //check if password is valid
        const validPassword = await validatePassword(password, user.password);
        // if (!validPassword) throw new Error("Password is not correct");
        if (!validPassword) return res.json({ message: "Password is not correct" });

        res.status(200).json({
            data: { email: user.email, role: user.role },
            message: "Login Successful",
          });
    }
    catch(error){
        res.status(401).json({
            msg: `error message ${error}`,
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) return res.json({ message: "User doesnot exist" });
      res.status(200).json({
        data: user,
      });
    }
    catch (error) {
    //   next(error);
      res.status(401).json({
        msg: `ID incorrect`,
    });
    }
};

exports.allowIfLoggedin = async (req, res, next) => {
    try {
      const user = res.locals.loggedInUser;
      if (!user) {
        return res.status(401).json({
          error: "You need to be logged in to access this route",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
  