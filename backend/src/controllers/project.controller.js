const ProjectModel = require("../models/project.model");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiErrors");
const ApiResponse = require("../utils/apiResponse");

const createProjectController = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    projectImage,
  } = req.body;

  if (!title || !description || !githubLink) {
    throw new ApiError(400, "All required fields are mandatory");
  }

  const project = await ProjectModel.create({
    title,
    description,
    techStack,
    githubLink,
    liveLink,
    projectImage,
    author: req.user.id,
  });

  return res
    .status(201)
    .json(new ApiResponse("Project created successfully", project));
});

const getAllProjectsController = asyncHandler(async (req, res) => {
  const projects = await ProjectModel.find().populate(
    "author",
    "name email profilePicture",
  );

  return res
    .status(200)
    .json(new ApiResponse("Projects fetched successfully", projects));
});

const getSingleProjectController = asyncHandler(async (req, res) => {
  const project = await ProjectModel.findById(req.params.id).populate(
    "author",
    "name email profilePicture",
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse("Project fetched successfully", project));
});

const updateProjectController = asyncHandler(async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.author.toString() !== req.user.id) {
    throw new ApiError(403, "Unauthorized access");
  }

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
  );

  return res
    .status(200)
    .json(new ApiResponse("Project updated successfully", updatedProject));
});

const deleteProjectController = asyncHandler(async (req, res) => {
  const project = await ProjectModel.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.author.toString() !== req.user.id) {
    throw new ApiError(403, "Unauthorized access");
  }

  await project.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse("Project deleted successfully"));
});const searchProjectsController = asyncHandler(async (req, res) => {
  const search = req.query.search || "";

  const projects = await ProjectModel.find({
    title: {
      $regex: search,
      $options: "i",
    },
  }).populate("author", "name profilePicture");

  return res
    .status(200)
    .json(new ApiResponse("Projects fetched successfully", projects));
});

const filterProjectsByTechStackController = asyncHandler(
  async (req, res) => {
    const tech = req.query.tech;

    const projects = await ProjectModel.find({
      techStack: {
        $in: [tech],
      },
    }).populate("author", "name profilePicture");

    return res
      .status(200)
      .json(new ApiResponse("Filtered projects fetched", projects));
  },
);

const latestProjectsController = asyncHandler(async (req, res) => {
  const projects = await ProjectModel.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .populate("author", "name profilePicture");

  return res
    .status(200)
    .json(new ApiResponse("Latest projects fetched", projects));
});

module.exports = {
  createProjectController,
  getAllProjectsController,
  getSingleProjectController,
  updateProjectController,
  deleteProjectController,
  searchProjectsController,
  filterProjectsByTechStackController,
  latestProjectsController,
};