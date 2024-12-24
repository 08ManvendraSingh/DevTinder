const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    bio: {
      type: String,
    },
    photoURL: {
      type: [String],
      default: [
        "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg",
      ],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
