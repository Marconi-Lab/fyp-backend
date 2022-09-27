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

// -----------------------------signup-------------------------------------
exports.signup = async(req, res, next) => {
    try {
        //capture user details
        const {email, password, role} = req.body;

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || "basic",
        });
        
        //create an access token for the user
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 3600,
        }
        );

        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            message: "You have signed up successfully"
        });
    } catch(error){
        next(error);
        console.log("Error detected")
    }
}