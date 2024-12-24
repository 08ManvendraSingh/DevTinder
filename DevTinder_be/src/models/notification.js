const mongoose = require("mongoose");

const notificationSchema= new mongoose.Schema(
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
    relatedConnection:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'ConnectionRequest',
    },
    notificationType:{
        type:String,
        enum:["requestSent","requestAccept"],
        required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Notification", notificationSchema);
