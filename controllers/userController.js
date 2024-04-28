const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");


//Create Account api
module.exports.newUser =  async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName) {
    return res.status(400).json({
        error: true,
        message: "Full name is required",
    });
    }
    if (!email) {
    return res.status(400).json({
        error: true,
        message: "email is required",
    });
    }
    if (!password) {
    return res.status(400).json({
        error: true,
        message: "password is required",
    });
    }
    const isUser = await User.findOne({ email: email });
    if (isUser) {
    return res.json({
        error: true,
        message: "User already exists",
    });
    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save();
    const accesToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1000m",
    });

    return res.json({
        error: false,
        user,
        accesToken,
        message: "Well don You Are In",
    });
};
//Login APi
module.exports.existingUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({
            error: true,
            message: "email is required",
        });
    }
    if (!password) {
        return res.status(400).json({
            error: true,
            message: "password is required",
        });
    }
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.json({
            error: true,
            message: "User not found",
        });
    }

    if (userInfo.email === email && userInfo.password === password) {
        const user = ({ user : userInfo});
        const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "36000m",
            })
        ;
        return res.json({
            error: false,
            email,
            accesToken,
            message: "Well You did It",
        });

    }else{
        return res.status(400).json ({
            error: true,
            message: "Invalid Credentials",
        });
    }
};

module.exports.isUser = async (req, res ) => {
    const {user} = req.user;

    const isUser = await User.findOne({_id: user._id});

    if (!isUser) {
        return res.status(401);
    }

    return res.json({
        user:{
            fullName: isUser.fullName, 
            email: isUser.email, 
            "_id": isUser._id, 
            createdOn: isUser.createdOn},
            
        message: "",
        });
};

