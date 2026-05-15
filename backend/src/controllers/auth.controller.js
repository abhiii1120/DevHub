const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiErrors");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
let crypto = require("crypto");
const generateOTP = require("../utils/generateOTP");
let registerController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new ApiError(400, "All fields are required");
  let isExisted = await UserModel.findOne({ email });
  if (isExisted)
    throw new ApiError(409, "User already registered try another Email");

  let hashPass = await bcrypt.hash(password, 10);
  let newUser = await UserModel.create({
    name,
    email,
    password: hashPass,
  });

  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
  httpOnly: true,
  secure: false,
});
  return res
    .status(201)
    .json(
      new ApiResponse("User registered sucessfully", { user: newUser, token }),
    );
});
let loginController = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  // Check fields
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Find user
  let user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare password
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate token
  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Store token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  return res
    .status(200)
    .json(new ApiResponse("Login successful", { user, token }));
});
let forgotPasswordController = asyncHandler(async (req, res) => {
  let { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Generate OTP
  const otp = generateOTP();

  // Hash OTP
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  // Save OTP
  user.resetPasswordOTP = hashedOTP;

  // Expiry
  user.resetPasswordOTPExpiry = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Send Email
  await sendMail({
    to: user.email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family:sans-serif">
        <h2>Password Reset Request</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 10 minutes.</p>
      </div>
    `,
  });

  return res.status(200).json(
    new ApiResponse("OTP sent successfully", {
      email: user.email,
    }),
  );
});
const resetPasswordController = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Hash incoming OTP
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  // Validate OTP
  if (user.resetPasswordOTP !== hashedOTP) {
    throw new ApiError(400, "Invalid OTP");
  }

  // Validate Expiry
  if (user.resetPasswordOTPExpiry < Date.now()) {
    throw new ApiError(400, "OTP expired");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Save new password
  user.password = hashedPassword;

  // Clear OTP
  user.resetPasswordOTP = undefined;
  user.resetPasswordOTPExpiry = undefined;

  await user.save();

  return res.status(200).json(new ApiResponse("Password reset successful"));
});
module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
};
