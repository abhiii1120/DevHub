const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiErrors");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getMyProfileController = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse("Profile fetched successfully", user));
});

const updateProfileController = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    bio,
    skills,
    github,
    linkedin,
    portfolio,
    profilePicture,
    bannerImage,
  } = req.body;
  const existingUsername = await UserModel.findOne({
    username,
    _id: { $ne: req.user.id },
  });

  if (existingUsername) throw new ApiError(400, "Username already taken");

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    {
      name,
      username,
      bio,
      skills,
      github,
      linkedin,
      portfolio,
      profilePicture,
      bannerImage,
    },
    {
      new: true,
    },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse("Profile updated successfully", updatedUser));
});

const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
    username: req.params.username,
  }).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse("User profile fetched successfully", user));
});

module.exports = {
  getMyProfileController,
  updateProfileController,
  getUserProfileController,
};
