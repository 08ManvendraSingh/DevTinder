const mongoose = require("mongoose");

const connectionRequestModel = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["interested", "ignored", "accepted", "rejected"],
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestModel.index({ fromUserId: 1, toUserId: 1 });

module.exports = mongoose.model("ConnectionRequest", connectionRequestModel);
