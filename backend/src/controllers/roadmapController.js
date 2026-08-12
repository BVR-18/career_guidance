const Career = require("../models/Career");
const User = require("../models/User");
const { generateRoadmapPhases } = require("../utils/roadmapGenerator");

/**
 * Single source of truth helper to process roadmap phases.
 * Calculates exact overall progress = (completedPhases / totalPhases) * 100.
 * Enforces strict sequential phase status: COMPLETED, CURRENT, LOCKED.
 * Always returns ALL phases in original order (1..N).
 */
function processRoadmapPhases(educationLevel, career, userSavedStepIds = []) {
  const generatedPhases = generateRoadmapPhases(educationLevel, career);

  // Clean saved step IDs (filter out undefined/null/non-strings)
  const cleanStepIds = (Array.isArray(userSavedStepIds) ? userSavedStepIds : []).filter(
    (id) => typeof id === "string" && id.trim().length > 0
  );

  // Evaluate completed phases strictly in sequential order
  const completedPhaseIds = [];
  for (let i = 0; i < generatedPhases.length; i++) {
    const p = generatedPhases[i];
    const isDirect = cleanStepIds.includes(p.id);
    const allTasksDone = p.tasks.length > 0 && p.tasks.every((t) => cleanStepIds.includes(t.id));

    if (i === 0) {
      if (isDirect || allTasksDone) {
        completedPhaseIds.push(p.id);
      } else {
        break; // Stop sequential chain
      }
    } else {
      // Phase i can only be completed if Phase i-1 is completed
      if (completedPhaseIds.includes(generatedPhases[i - 1].id)) {
        if (isDirect || allTasksDone) {
          completedPhaseIds.push(p.id);
        } else {
          break; // Stop sequential chain
        }
      } else {
        break;
      }
    }
  }

  const normalizedPhases = generatedPhases.map((p) => {
    const isCompleted = completedPhaseIds.includes(p.id);
    const isPreviousCompleted = p.order === 1 || completedPhaseIds.includes(generatedPhases[p.order - 2].id);
    let status = "LOCKED";

    if (isCompleted) {
      status = "COMPLETED";
    } else if (isPreviousCompleted) {
      status = "CURRENT";
    } else {
      status = "LOCKED";
    }

    const tasks = p.tasks.map((t) => ({
      ...t,
      completed: isCompleted || cleanStepIds.includes(t.id),
    }));

    return {
      id: p.id,
      order: p.order,
      stage: p.stage,
      title: p.title,
      description: p.description,
      status,
      tasks,
    };
  });

  const totalCount = generatedPhases.length;
  const completedCount = completedPhaseIds.length;
  // Accurate overall progress calculation: (completedPhases / totalPhases) * 100
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const currentPhase = normalizedPhases.find((p) => p.status === "CURRENT") || null;
  const isCompleted = completedCount === totalCount && totalCount > 0;

  let nextAction = "Complete Phase 1 to unlock your career pathway.";
  if (isCompleted) {
    nextAction = "Congratulations! You have completed all roadmap phases!";
  } else if (currentPhase) {
    nextAction = `Complete Phase ${currentPhase.order} (${currentPhase.title}) to unlock the next phase.`;
  }

  const steps = normalizedPhases.map((p) => ({
    id: p.id,
    stage: p.stage,
    title: p.title,
    description: p.description,
    order: p.order,
    status: p.status.toLowerCase(),
  }));

  return {
    careerId: career._id.toString(),
    careerTitle: career.title,
    educationLevel: (educationLevel || career.educationLevel || "BTECH").toUpperCase(),
    phases: normalizedPhases,
    steps,
    progress,
    completedPhasesCount: completedCount,
    totalPhasesCount: totalCount,
    currentPhase,
    nextAction,
    isCompleted,
    completedStepIds: cleanStepIds,
  };
}

exports.getRoadmap = async (req, res, next) => {
  try {
    let careerId = req.params.careerId;
    let career = null;

    if (careerId && careerId !== "default") {
      career = await Career.findById(careerId);
    }

    const targetLevel = req.user?.educationLevel || "BTECH";

    if (!career) {
      if (req.user?.activeCareer) {
        career = await Career.findById(req.user.activeCareer);
      }
    }

    if (!career) {
      career = await Career.findOne({ educationLevel: targetLevel });
    }

    if (!career) {
      career = await Career.findOne({});
    }

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "No roadmap available for your category.",
      });
    }

    if (req.user && (!req.user.activeCareer || req.user.activeCareer.toString() !== career._id.toString())) {
      await User.findByIdAndUpdate(req.user._id, { activeCareer: career._id });
    }

    let savedStepIds = [];
    if (req.user) {
      const user = await User.findById(req.user._id);
      const entry = user?.completedRoadmapSteps?.find(
        (item) => item.careerId.toString() === career._id.toString()
      );
      if (entry) {
        savedStepIds = entry.stepIds || [];
      }
    }

    const roadmapData = processRoadmapPhases(targetLevel, career, savedStepIds);

    res.status(200).json({
      success: true,
      data: roadmapData,
    });
  } catch (error) {
    next(error);
  }
};

exports.getRoadmapProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const careerId = req.params.careerId;
    const career = await Career.findById(careerId);
    const entry = user.completedRoadmapSteps?.find(
      (item) => item.careerId.toString() === careerId
    );
    const savedStepIds = entry ? entry.stepIds : [];

    if (career) {
      const roadmapData = processRoadmapPhases(user.educationLevel, career, savedStepIds);
      return res.status(200).json({
        success: true,
        data: {
          careerId,
          completedStepIds: savedStepIds,
          progress: roadmapData.progress,
          completedPhasesCount: roadmapData.completedPhasesCount,
          totalPhasesCount: roadmapData.totalPhasesCount,
          currentPhase: roadmapData.currentPhase,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        careerId,
        completedStepIds: savedStepIds,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.saveRoadmapProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const careerId = req.params.careerId;
    const career = await Career.findById(careerId);

    if (!career) {
      return res.status(404).json({ success: false, message: "Career not found" });
    }

    const { stepIds, reopenPhaseId, action } = req.body;

    const generatedPhases = generateRoadmapPhases(user.educationLevel, career);

    const existingEntry = user.completedRoadmapSteps?.find(
      (item) => item.careerId.toString() === careerId
    );
    let currentSavedIds = existingEntry ? existingEntry.stepIds || [] : [];

    // Handle Reopen / Mark Incomplete Action
    if (reopenPhaseId || action === "reopen" || action === "incomplete") {
      const targetReopenId = reopenPhaseId || (Array.isArray(stepIds) ? stepIds[0] : null);
      const targetPhase = generatedPhases.find((p) => p.id === targetReopenId);

      if (targetPhase) {
        // Find all phases from targetPhase.order onwards and strip their phase & task IDs
        const affectedPhases = generatedPhases.filter((p) => p.order >= targetPhase.order);
        const affectedIds = new Set();
        affectedPhases.forEach((p) => {
          affectedIds.add(p.id);
          p.tasks.forEach((t) => affectedIds.add(t.id));
        });

        currentSavedIds = currentSavedIds.filter((id) => !affectedIds.has(id));
      }
    } else if (Array.isArray(stepIds)) {
      // Direct completion/update payload
      const cleanInputIds = stepIds.filter((id) => typeof id === "string" && id.trim().length > 0);

      // Validate sequential progression for newly completed phases
      const validatedStepIds = [];

      for (let i = 0; i < generatedPhases.length; i++) {
        const p = generatedPhases[i];
        const isRequested = cleanInputIds.includes(p.id);
        const allTasksRequested =
          p.tasks.length > 0 && p.tasks.every((t) => cleanInputIds.includes(t.id));

        if (isRequested || allTasksRequested) {
          if (i > 0 && !validatedStepIds.includes(generatedPhases[i - 1].id)) {
            return res.status(400).json({
              success: false,
              message: `Sequential Progression Error: Phase ${p.order} (${p.title}) cannot be completed before completing Phase ${p.order - 1} (${generatedPhases[i - 1].title}).`,
            });
          }
          validatedStepIds.push(p.id);
          p.tasks.forEach((t) => {
            if (!validatedStepIds.includes(t.id)) {
              validatedStepIds.push(t.id);
            }
          });
        } else {
          p.tasks.forEach((t) => {
            if (cleanInputIds.includes(t.id) && !validatedStepIds.includes(t.id)) {
              validatedStepIds.push(t.id);
            }
          });
        }
      }

      currentSavedIds = validatedStepIds;
    }

    if (!user.completedRoadmapSteps) {
      user.completedRoadmapSteps = [];
    }

    const existingIndex = user.completedRoadmapSteps.findIndex(
      (item) => item.careerId.toString() === careerId
    );

    if (existingIndex > -1) {
      user.completedRoadmapSteps[existingIndex].stepIds = currentSavedIds;
      user.completedRoadmapSteps[existingIndex].updatedAt = new Date();
    } else {
      user.completedRoadmapSteps.push({
        careerId,
        stepIds: currentSavedIds,
        updatedAt: new Date(),
      });
    }

    user.activeCareer = career._id;

    if (!user.savedCareers.some((id) => id.toString() === careerId)) {
      user.savedCareers.push(careerId);
    }

    await user.save();

    const updatedRoadmap = processRoadmapPhases(user.educationLevel, career, currentSavedIds);

    res.status(200).json({
      success: true,
      message: "Roadmap progress updated successfully",
      data: updatedRoadmap,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmap: exports.getRoadmap,
  getRoadmapProgress: exports.getRoadmapProgress,
  saveRoadmapProgress: exports.saveRoadmapProgress,
  processRoadmapPhases,
};