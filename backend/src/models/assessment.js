const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: Number,
          required: true,
        },

        value: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],

    educationLevel: {
      type: String,
      enum: ["TENTH", "INTERMEDIATE", "BTECH"],
      default: "BTECH",
    },

    scores: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    topCategories: [
      {
        type: String,
      },
    ],

    primaryRecommendation: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
    },

    alternativeOptions: [
      {
        type: String,
      },
    ],

    recommendedCareers: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);