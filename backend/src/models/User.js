const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "professional", "admin"],
      default: "student",
    },
    educationLevel: {
      type: String,
      enum: ["TENTH", "INTERMEDIATE", "BTECH"],
      default: "BTECH",
      required: true,
    },
    activeCareer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
    },
    savedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Career",
      },
    ],
    completedRoadmapSteps: [
      {
        careerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Career",
          required: true,
        },
        stepIds: [
          {
            type: String,
          },
        ],
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);