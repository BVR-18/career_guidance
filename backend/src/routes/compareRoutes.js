const express = require("express");
const router = express.Router();

const { compareCareers } = require("../controllers/compareController");

router.get("/", compareCareers);

module.exports = router;