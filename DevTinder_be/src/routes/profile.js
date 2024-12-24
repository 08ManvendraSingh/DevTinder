const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const { uploadImageCloudinary } = require("../utils/uploadImageCloudinary");
const profileRouter = express.Router();
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: "get user successfully",
      data: user,
      error: true,
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

profileRouter.post(
  "/profile/uploadProfileImg",
  userAuth,
  upload.array("photoURL"),
  async (req, res) => {
    try {
      const user = req.user;

      const image = req.files;
      const uploadPromises = image.map((file) => uploadImageCloudinary(file));
      const uploadResults = await Promise.all(uploadPromises);
      const uploadedImageUrls = uploadResults.map((result) => result.url);

      user.photoURL = uploadedImageUrls;
      await user.save();

      res.status(200).json({
        message: "user Image updated successfully",
        data: {
          _id: user._id,
          photoURL: uploadedImageUrls,
        },
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
  }
);

profileRouter.put("/profile/updateProfile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const allowedFields = ["firstName", "lastName", "age", "gender","bio"];
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

    const fieldsToUpdate = Object.keys(req.body).filter((field) =>
      allowedFields.includes(field)
    );
    if (fieldsToUpdate.length == 0) {
      return res.status(400).json({
        message: "No data to update",
        error: true,
        success: false,
      });
    }

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();

    res.status(200).json({
      message: "user data updated successfully",
      data: user,
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

module.exports = { profileRouter };
