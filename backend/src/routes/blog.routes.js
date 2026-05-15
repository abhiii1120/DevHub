const express = require("express");

const {
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
} = require("../controllers/blog.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createBlogController);
router.get("/", getAllBlogsController);
router.get("/:id", getSingleBlogController);
router.put("/:id", authMiddleware, updateBlogController);
router.delete("/:id", authMiddleware, deleteBlogController);

module.exports = router;