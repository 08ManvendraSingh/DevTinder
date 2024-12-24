const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const Notification = require("../models/notification");

userRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUser = req.user;
    const { status, toUserId } = req.params;

    const allowedStatus = ["ignored", "interested"];
    const isAllowedStatus = allowedStatus.includes(status);
    if (!isAllowedStatus) {
      return res.status(500).json({
        message: "Invalid Status",
        error: true,
        success: false,
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(500).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const requestToItself = fromUser._id.equals(toUserId);
    if (requestToItself) {
      return res.status(500).json({
        message: "cannot send request to yourself",
        error: true,
        success: false,
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId: fromUser._id,
          toUserId: toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUser._id,
        },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(500).json({
        message: "Request Already exists",
        error: true,
        success: false,
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId: fromUser._id,
      toUserId,
      status,
    });

    await connectionRequest.save();

     // Create a Notification only if the status is "interested"
     if (status === "interested") {
      const notification = new Notification({
        fromUserId: fromUser._id,
        toUserId,
        relatedConnection: connectionRequest._id,
        notificationType:"requestSent",
      });

      await notification.save();
    }

    res.status(200).json({
      message: "connection request sent successfully",
      data: connectionRequest,
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

userRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    const isAllowedStatus = allowedStatus.includes(status);
    if (!isAllowedStatus) {
      return res.status(404).json({
        message: "Invalid Status",
        error: true,
        success: false,
      });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: user._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection request not found",
        error: true,
        success: false,
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

     // Create a Notification only if the status is "interested"
     if (status === "accepted") {
      const notification = new Notification({
        toUserId: connectionRequest.fromUserId, // Notify the sender
        fromUserId: user._id, // The one who accepted the request
        relatedConnection: connectionRequest._id,
        notificationType:"requestAccept",
      });
      await notification.save();
    }

    res.status(200).json({
      message: "connection request " + status,
      data: data,
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

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connections = await ConnectionRequest.find({
      $or: [
        {
          toUserId: user._id,
          status: "accepted",
        },
        {
          fromUserId: user._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName","gender","bio","photoURL"])
      .populate("toUserId", ["firstName", "lastName","gender","bio","photoURL"]);

    const data = connections.map((row) => {
      if (row.fromUserId._id.equals(user._id)) {
        return row?.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      message: "get connections successfully",
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

userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const connectionsRequest = await ConnectionRequest.find({
      toUserId: user._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName","photoURL"]);

    res.status(200).json({
      message: "get connections request successfully",
      data: connectionsRequest,
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

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const hideFromFeed = new Set();
    connectionRequest.forEach((request) => {
      hideFromFeed.add(request.fromUserId.toString());
      hideFromFeed.add(request.toUserId.toString());
    });

    const feed = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideFromFeed) },
        },
        {
          _id: { $ne: user._id },
        },
      ],
    }).select('firstName lastName age photoURL');

    res.status(200).json({
      message: "get feed successfully",
      data: feed,
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

module.exports = { userRouter };