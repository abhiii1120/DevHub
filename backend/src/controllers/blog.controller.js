const blogModel = require("../models/blog.model");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createBlogController = asyncHandler(async (req, res) => {
  const { title, content, tags, category, coverImage } = req.body;
  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const blog = await blogModel.create({
    title,
    content,
    tags,
    category,
    coverImage,
    author: req.user.id,
  });
  return res
    .status(201)
    .json(new ApiResponse("Blog Created Sucessfully", blog));
});

// GET ALL BLOGS
const getAllBlogsController = asyncHandler(async (req, res) => {
  const blogs = await BlogModel.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse("Blogs fetched successfully", blogs));
});


module.exports = {
    createBlogController,
}
