const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    console.log("token", req.cookies.token); // Log cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }


    const isValidToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded); // Log decoded token
    if (!isValidToken) {
      return res.status(401).json({
        message: "Invalid Token",
        error: true,
        success: false,
      });
    }

    const { _id } = isValidToken;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(500).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = { userAuth };
