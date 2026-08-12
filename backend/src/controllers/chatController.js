const Assessment = require("../models/Assessment");
const { askCareerAI } = require("../services/geminiService");

exports.chat = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const educationLevel = req.user?.educationLevel || "BTECH";
    const userId = req.user?._id;

    let assessment = null;
    if (userId) {
      assessment = await Assessment.findOne({ user: userId }).sort({ createdAt: -1 });
    }

    let context = `Student Education Level: ${educationLevel}\n`;

    if (educationLevel === "TENTH") {
      context += `
Category Instructions:
You are assisting a 10th Class Student preparing to choose their stream after 10th (MPC, BiPC, MEC, CEC, Polytechnic, ITI) in Andhra Pradesh / India.
Focus on clarifying Intermediate subject combinations, polytechnic diplomas, future career options after 10th, and educational pathways.
Keep your language encouraging, simple, structured, and easy for a school student to understand.
`;
    } else if (educationLevel === "INTERMEDIATE") {
      context += `
Category Instructions:
You are assisting an Intermediate Student evaluating options after 12th / Intermediate (BTech vs BSc / BCom / BA / BBA / BCA, CA, Law, Healthcare, Govt jobs, Defence).
Explain 'What is BTech', major BTech branches, AP EAPCET / JEE entrance pathway, degree alternatives, and career prospects clearly.
`;
    } else {
      context += `
Category Instructions:
You are assisting a BTech Student looking for engineering job roles, DSA / Coding preparation, skill building, capstone projects, resume building, and technical interview preparation.
Provide job-oriented, structured, professional guidance.
`;
    }

    if (assessment) {
      context += `
User Assessment Context:
- Primary Recommendation: ${assessment.primaryRecommendation || assessment.topCategories.join(", ")}
- Explanation: ${assessment.explanation || "N/A"}
- Recommended Careers/Options: ${assessment.recommendedCareers.join(", ")}
`;
    }

    const prompt = `
${context}

User Question:
${message}
`;

    const reply = await askCareerAI(prompt, educationLevel);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    next(error);
  }
};