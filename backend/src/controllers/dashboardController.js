const User = require("../models/User");
const Assessment = require("../models/Assessment");
const Career = require("../models/Career");
const { processRoadmapPhases } = require("./roadmapController");

function normalizeCareer(c) {
  if (!c) return null;
  const obj = c.toObject ? c.toObject() : c;
  const min = obj.salary?.min || 500000;
  const max = obj.salary?.max || 2000000;
  return {
    id: (obj._id || obj.id).toString(),
    title: obj.title || "",
    category: obj.category || "",
    description: obj.description || "",
    skills: Array.isArray(obj.skills) ? obj.skills : [],
    salaryMin: min,
    salaryMax: max,
    salary: `₹${(min / 100000).toFixed(0)}L – ₹${(max / 100000).toFixed(0)}L`,
    roadmap: Array.isArray(obj.roadmap) ? obj.roadmap : [],
  };
}

exports.getDashboard = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("savedCareers");

    const assessment = await Assessment.findOne({ user: req.user._id })
      .sort({ createdAt: -1 });

    const targetLevel = user.educationLevel || "BTECH";

    // 1. Determine Active Career for single source of truth Roadmap
    let activeCareerDoc = null;
    if (user.activeCareer) {
      activeCareerDoc = await Career.findById(user.activeCareer);
    }

    if (!activeCareerDoc && user.savedCareers && user.savedCareers.length > 0) {
      activeCareerDoc = user.savedCareers[0];
    }

    if (!activeCareerDoc && assessment && assessment.recommendedCareers.length > 0) {
      activeCareerDoc = await Career.findOne({
        educationLevel: targetLevel,
        title: { $in: assessment.recommendedCareers },
      });
    }

    if (!activeCareerDoc) {
      activeCareerDoc = await Career.findOne({ educationLevel: targetLevel });
    }

    if (!activeCareerDoc) {
      activeCareerDoc = await Career.findOne({});
    }

    // Save activeCareer if updated
    if (activeCareerDoc && (!user.activeCareer || user.activeCareer.toString() !== activeCareerDoc._id.toString())) {
      user.activeCareer = activeCareerDoc._id;
      await user.save();
    }

    // 2. Calculate accurate single-source-of-truth roadmap progress
    let roadmapProgress = 0;
    let roadmapDetails = null;

    if (activeCareerDoc) {
      const activeCareerId = activeCareerDoc._id.toString();
      const stepEntry = user.completedRoadmapSteps?.find(
        (item) => item.careerId.toString() === activeCareerId
      );
      const savedStepIds = stepEntry ? stepEntry.stepIds : [];

      const processed = processRoadmapPhases(targetLevel, activeCareerDoc, savedStepIds);
      roadmapProgress = processed.progress;

      roadmapDetails = {
        activeCareer: {
          id: activeCareerDoc._id.toString(),
          title: activeCareerDoc.title,
          educationLevel: targetLevel,
        },
        roadmapProgress: processed.progress,
        completedPhasesCount: processed.completedPhasesCount,
        totalPhasesCount: processed.totalPhasesCount,
        currentPhase: processed.currentPhase,
        nextAction: processed.nextAction,
        isCompleted: processed.isCompleted,
      };
    }

    // 3. Recommended careers matching user's educationLevel
    let recommendedCareers = [];
    if (assessment && assessment.recommendedCareers.length > 0) {
      const found = await Career.find({
        educationLevel: targetLevel,
        title: { $in: assessment.recommendedCareers },
      });
      recommendedCareers = found.map(normalizeCareer);
    }

    if (recommendedCareers.length === 0) {
      const fallback = await Career.find({ educationLevel: targetLevel }).limit(4);
      recommendedCareers = fallback.map(normalizeCareer);
    }

    // 4. Build recent activity list
    const recentActivity = [];
    if (assessment) {
      recentActivity.push({
        id: assessment._id.toString(),
        type: "assessment",
        description: `Completed career assessment — top areas: ${assessment.topCategories.join(", ")}`,
        timestamp: assessment.createdAt.toISOString(),
      });
    }

    if (Array.isArray(user.completedRoadmapSteps)) {
      user.completedRoadmapSteps.forEach((item) => {
        if (item.stepIds && item.stepIds.length > 0) {
          recentActivity.push({
            id: item._id ? item._id.toString() : item.careerId.toString(),
            type: "roadmap_step",
            description: `Completed milestone(s) on roadmap`,
            timestamp: item.updatedAt ? item.updatedAt.toISOString() : new Date().toISOString(),
          });
        }
      });
    }

    user.savedCareers.slice(0, 3).forEach((c) => {
      recentActivity.push({
        id: c._id.toString(),
        type: "career_saved",
        description: `Saved "${c.title}" to your dashboard`,
        timestamp: c.updatedAt ? c.updatedAt.toISOString() : new Date().toISOString(),
      });
    });

    // 5. Latest assessment shape
    const latestAssessment = assessment
      ? {
          completedAt: assessment.createdAt.toISOString(),
          topCategories: assessment.topCategories,
          primaryRecommendation: assessment.primaryRecommendation || assessment.recommendedCareers[0],
          explanation: assessment.explanation,
          scores: assessment.scores,
        }
      : null;

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          educationLevel: user.educationLevel || "BTECH",
        },
        stats: {
          assessmentsTaken: assessment ? 1 : 0,
          savedCareersCount: user.savedCareers.length,
          chatSessions: 0,
          roadmapProgress,
        },
        roadmap: roadmapDetails,
        recommendedCareers,
        savedCareers: user.savedCareers.map(normalizeCareer),
        recentActivity,
        latestAssessment,
        progress: roadmapProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.saveCareer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.savedCareers.includes(req.params.careerId)) {
      user.savedCareers.push(req.params.careerId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Career saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.removeSavedCareer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.savedCareers = user.savedCareers.filter(
      (id) => id.toString() !== req.params.careerId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Career removed successfully",
    });
  } catch (error) {
    next(error);
  }
};