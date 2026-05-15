const BlogModel = require("../models/blog.model");
const ApiError = require("../utils/apiErrors");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");


// CREATE BLOG
const createBlogController = asyncHandler(async (req, res) => {
  const { title, content, tags, category, coverImage } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const blog = await BlogModel.create({
    title,
    content,
    tags,
    category,
    coverImage,
    author: req.user.id,
  });

  return res
    .status(201)
    .json(new ApiResponse("Blog created successfully", blog));
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


// GET SINGLE BLOG
const getSingleBlogController = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id).populate(
    "author",
    "name email"
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  return res
    .status(200)
    .json(new ApiResponse("Blog fetched successfully", blog));
});


// UPDATE BLOG
const updateBlogController = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // owner check
  if (blog.author.toString() !== req.user.id) {
    throw new ApiError(403, "Access denied");
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse("Blog updated successfully", updatedBlog));
});


// DELETE BLOG
const deleteBlogController = asyncHandler(async (req, res) => {
  const blog = await BlogModel.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (blog.author.toString() !== req.user.id) {
    throw new ApiError(403, "Access denied");
  }

  await blog.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse("Blog deleted successfully"));
});

module.exports = {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
};