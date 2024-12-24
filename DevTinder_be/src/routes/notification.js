const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Notification = require("../models/notification");

const notificationRouter = express.Router();

notificationRouter.get("/notification", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const notification = await Notification.find({
      toUserId: user._id, 
    })
      .sort({ createdAt: -1 })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    res.status(200).json({
      message: "notification fetched successfully",
      data: notification,
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

module.exports = { notificationRouter };
