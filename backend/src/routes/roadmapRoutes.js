const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRoadmap,
  getRoadmapProgress,
  saveRoadmapProgress,
} = require("../controllers/roadmapController");

router.get("/:careerId", protect, getRoadmap);
router.get("/:careerId/progress", protect, getRoadmapProgress);
router.put("/:careerId/progress", protect, saveRoadmapProgress);

module.exports = router;