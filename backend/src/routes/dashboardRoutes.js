const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getDashboard,

    saveCareer,

    removeSavedCareer

} = require("../controllers/dashboardController");

router.get("/", protect, getDashboard);

router.post(
    "/save-career/:careerId",
    protect,
    saveCareer
);

router.delete(
    "/save-career/:careerId",
    protect,
    removeSavedCareer
);

module.exports = router;