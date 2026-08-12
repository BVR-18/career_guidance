const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
} = require("../controllers/careerController");

// =======================
// ROUTES
// =======================

// Public: anyone can browse careers (no auth required)
router.get("/", getCareers);
router.get("/:id", getCareerById);

// Protected: only admins / authenticated users can create/update
router.post("/", protect, createCareer);
router.put("/:id", protect, updateCareer);

module.exports = router;