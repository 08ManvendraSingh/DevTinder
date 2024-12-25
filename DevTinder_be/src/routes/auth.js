const e = require("express");
const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateSignupData,
  validateLoginData,
} = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req, res);
    const { firstName, lastName, emailId, password } = req.body;

    const allowedFields = ["firstName", "lastName", "emailId", "password"];
    const isAllowedFields = Object.keys(req.body).every((field) =>
      allowedFields.includes(field)
    );

    if (!isAllowedFields) {
      return res.status(400).json({
        message: "Invalid Data",
        error: true,
        success: false,
      });
    }

    const existingUser = await User.findOne({ emailId: emailId });
    if (existingUser) {
      return res.status(400).json({
        message: "Email Already Registered",
        error: true,
        success: false,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const data = await user.save();

    res.status(200).json({
      message: "Signup successfully",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLoginData(req, res);

    const { emailId, password } = req.body;

    const isUserAvailable = await User.findOne({ emailId: emailId });
    if (!isUserAvailable) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserAvailable.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Credentials",
        error: true,
        success: false,
      });
    }

    const token = await jwt.sign(
      { _id: isUserAvailable._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );

    console.log('token',token);

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.status(200).json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

module.exports = { authRouter };
