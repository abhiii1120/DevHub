const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  createProjectController,
  getAllProjectsController,
  getSingleProjectController,
  updateProjectController,
  deleteProjectController,
  searchProjectsController,
  filterProjectsByTechStackController,
  latestProjectsController,
} = require("../controllers/project.controller");

const router = express.Router();

router.post("/", authMiddleware, createProjectController);
router.get("/", getAllProjectsController);
router.get("/search", searchProjectsController);
router.get("/filter", filterProjectsByTechStackController);
router.get("/latest", latestProjectsController);
router.get("/:id", getSingleProjectController);
router.put("/:id", authMiddleware, updateProjectController);
router.delete("/:id", authMiddleware, deleteProjectController);

module.exports = router;