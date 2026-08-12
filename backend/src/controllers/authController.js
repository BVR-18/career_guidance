const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Normalize mongoose user doc to match frontend User type
function normalizeUser(user) {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    educationLevel: user.educationLevel || "BTECH",
    createdAt: user.createdAt,
  };
}

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password, role, educationLevel } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: role || "student",
      educationLevel: educationLevel || "BTECH",
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: normalizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, educationLevel } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Validate that account's educationLevel matches selected login tab/category
    if (educationLevel && user.educationLevel && user.educationLevel !== educationLevel) {
      const levelLabels = {
        TENTH: "10th Class Student",
        INTERMEDIATE: "Intermediate Student",
        BTECH: "BTech Student",
      };
      const userCategoryLabel = levelLabels[user.educationLevel] || user.educationLevel;
      const selectedCategoryLabel = levelLabels[educationLevel] || educationLevel;

      return res.status(400).json({
        success: false,
        message: `Account mismatch: This account is registered as a "${userCategoryLabel}". You selected "${selectedCategoryLabel}". Please select the "${userCategoryLabel}" tab to log in.`,
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: normalizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: normalizeUser(req.user),
    });
  } catch (error) {
    next(error);
  }
};