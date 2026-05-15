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

let UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
