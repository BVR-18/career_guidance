console.log("Career Controller Loaded");

const Career = require("../models/Career");


// =====================================
// GET ALL CAREERS
// =====================================

// Helper: normalize Mongoose doc so _id becomes id & salaryMin/salaryMax are populated
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

exports.getCareers = async (req, res, next) => {
  try {
    const { search, category, branch, maxSalary } = req.query;

    // Strict Education Level Authorization Filter
    const targetLevel = req.query.educationLevel || req.user?.educationLevel || "BTECH";

    const filter = {
      educationLevel: targetLevel,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { branch: { $regex: search, $options: "i" } },
        { skills: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    if (category && category.toLowerCase() !== "all") {
      filter.category = category.toLowerCase();
    }

    if (branch && branch !== "All") {
      filter.branch = { $regex: branch, $options: "i" };
    }

    if (maxSalary) {
      filter["salary.max"] = { $lte: Number(maxSalary) };
    }

    const careers = await Career.find(filter).sort({ title: 1 });

    res.status(200).json({
      success: true,
      educationLevel: targetLevel,
      data: careers.map(normalizeCareer),
    });
  } catch (error) {
    next(error);
  }
};


// =====================================
// GET CAREER BY ID
// =====================================

exports.getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    res.status(200).json({
      success: true,
      data: normalizeCareer(career),
    });
  } catch (error) {
    next(error);
  }
};


// =====================================
// CREATE CAREER
// =====================================

exports.createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);

    res.status(201).json({
      success: true,
      message: "Career created successfully",
      career,
    });
  } catch (error) {
    next(error);
  }
};


// =====================================
// UPDATE CAREER
// =====================================

exports.updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Career updated successfully",
      career,
    });
  } catch (error) {
    next(error);
  }
};