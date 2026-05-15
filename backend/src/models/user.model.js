const { default: mongoose } = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bannerImage: {
      type: String,
      default: "",
    },
    medium: {
      type: String,
      default: "",
    },
    linkedln: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: true,
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordOTPExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

let UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;
