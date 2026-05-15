const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  getMyProfileController,
  updateProfileController,
  getUserProfileController,
} = require("../controllers/profile.controller");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfileController);
router.put("/update", authMiddleware, updateProfileController);
router.get("/:username", getUserProfileController);

module.exports = router;