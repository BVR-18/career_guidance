const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "technology",
        "business",
        "creative",
        "social",
        "analytical",
        "healthcare",
      ],
    },

    branch: {
      type: String,
      default: "General Engineering",
      trim: true,
    },

    educationLevel: {
      type: String,
      enum: ["TENTH", "INTERMEDIATE", "BTECH"],
      default: "BTECH",
      required: true,
    },

    careerType: {
      type: String,
      enum: [
        "INTERMEDIATE_STREAM",
        "POST_10TH_COURSE",
        "DEGREE_COURSE",
        "PROFESSIONAL_COURSE",
        "COMPETITIVE_PATHWAY",
        "JOB_ROLE",
      ],
      default: "JOB_ROLE",
    },

    skills: [
      {
        type: String,
      },
    ],

    roadmap: [
      {
        type: String,
      },
    ],

    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Career", careerSchema);