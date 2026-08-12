const Career = require("../models/Career");

function normalizeCareer(c) {
  if (!c) return null;
  const obj = c.toObject ? c.toObject() : c;
  const min = obj.salary?.min || 0;
  const max = obj.salary?.max || 0;
  let salaryText = "Academic / Stream Pathway";
  if (min > 0 || max > 0) {
    salaryText = `₹${(min / 100000).toFixed(0)}L – ₹${(max / 100000).toFixed(0)}L`;
  }
  return {
    id: (obj._id || obj.id).toString(),
    title: obj.title || "",
    category: obj.category || "",
    branch: obj.branch || "General",
    educationLevel: obj.educationLevel || "BTECH",
    careerType: obj.careerType || "JOB_ROLE",
    description: obj.description || "",
    skills: Array.isArray(obj.skills) ? obj.skills : [],
    salaryMin: min,
    salaryMax: max,
    salary: salaryText,
    roadmap: Array.isArray(obj.roadmap) ? obj.roadmap : [],
  };
}

exports.compareCareers = async (req, res, next) => {
  try {
    const { id1, id2 } = req.query;

    if (!id1 || !id2) {
      return res.status(400).json({
        success: false,
        message: "Please provide both career IDs.",
      });
    }

    const career1 = await Career.findById(id1);
    const career2 = await Career.findById(id2);

    if (!career1 || !career2) {
      return res.status(404).json({
        success: false,
        message: "One or both options were not found.",
      });
    }

    const targetLevel = req.user?.educationLevel;
    if (targetLevel) {
      if (career1.educationLevel !== targetLevel || career2.educationLevel !== targetLevel) {
        return res.status(400).json({
          success: false,
          message: `Comparison is only allowed between options in your ${targetLevel} category.`,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        careerA: normalizeCareer(career1),
        careerB: normalizeCareer(career2),
      },
    });
  } catch (error) {
    next(error);
  }
};