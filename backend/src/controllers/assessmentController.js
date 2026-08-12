const Assessment = require("../models/Assessment");
const Career = require("../models/Career");
const {
  tenthQuestions,
  intermediateQuestions,
  btechQuestions,
} = require("../utils/assessmentQuestions");
const careerMapping = require("../utils/careerMapping");

function normalizeCareer(c) {
  if (!c) return null;
  const obj = c.toObject ? c.toObject() : c;
  const min = obj.salary?.min || 500000;
  const max = obj.salary?.max || 2000000;
  return {
    id: (obj._id || obj.id).toString(),
    title: obj.title || "",
    category: obj.category || "",
    branch: obj.branch || "General Engineering",
    description: obj.description || "",
    skills: Array.isArray(obj.skills) ? obj.skills : [],
    salaryMin: min,
    salaryMax: max,
    salary: `₹${(min / 100000).toFixed(0)}L – ₹${(max / 100000).toFixed(0)}L`,
    roadmap: Array.isArray(obj.roadmap) ? obj.roadmap : [],
  };
}

const standardOptions = [
  { id: "1", label: "Strongly Disagree", value: "1" },
  { id: "2", label: "Disagree", value: "2" },
  { id: "3", label: "Neutral", value: "3" },
  { id: "4", label: "Agree", value: "4" },
  { id: "5", label: "Strongly Agree", value: "5" },
];

// ================================
// GET QUESTIONS
// ================================
exports.getQuestions = async (req, res, next) => {
  try {
    const educationLevel =
      req.query.educationLevel || req.user?.educationLevel || "BTECH";

    let rawQuestions = btechQuestions;
    if (educationLevel === "TENTH") {
      rawQuestions = tenthQuestions;
    } else if (educationLevel === "INTERMEDIATE") {
      rawQuestions = intermediateQuestions;
    }

    const questions = rawQuestions.map((q) => ({
      id: String(q.id),
      question: q.question,
      category: q.category,
      options: standardOptions,
    }));

    res.status(200).json({
      success: true,
      educationLevel,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

// Format Assessment Doc for Frontend
async function formatAssessmentResult(doc) {
  const targetLevel = doc.educationLevel || "BTECH";
  const titles = doc.recommendedCareers || [];

  const foundCareers = await Career.find({
    educationLevel: targetLevel,
    $or: [{ title: { $in: titles } }, { category: { $in: doc.topCategories } }],
  }).limit(6);

  let careersList = foundCareers.map(normalizeCareer);
  if (careersList.length === 0) {
    const defaultCareers = await Career.find({ educationLevel: targetLevel }).limit(6);
    careersList = defaultCareers.map(normalizeCareer);
  }

  const scoresArray = Object.entries(doc.scores || {}).map(([category, score]) => ({
    category,
    score: Number(score),
  }));

  return {
    id: doc._id.toString(),
    educationLevel: targetLevel,
    scores: scoresArray,
    topCategories: doc.topCategories || [],
    primaryRecommendation: doc.primaryRecommendation || doc.topCategories[0] || "",
    explanation: doc.explanation || "Recommended based on your academic interests & preferences.",
    alternativeOptions: doc.alternativeOptions || [],
    recommendedCareers: careersList,
    completedAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
  };
}

// ================================
// SUBMIT ASSESSMENT
// ================================
exports.submitAssessment = async (req, res, next) => {
  try {
    const { answers } = req.body;
    const educationLevel = req.user?.educationLevel || "BTECH";

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array",
      });
    }

    let primaryRecommendation = "";
    let explanation = "";
    let alternativeOptions = [];
    let recommendedTitles = [];
    let topCategories = [];
    let scores = {};

    if (educationLevel === "TENTH") {
      // 10th Assessment Scoring
      const streamScores = {
        MPC: 0,
        BiPC: 0,
        MEC: 0,
        CEC: 0,
        Polytechnic: 0,
        ITI: 0,
      };

      answers.forEach((ans) => {
        const qId = Number(ans.questionId);
        const question = tenthQuestions.find((q) => q.id === qId);
        const val = Number(ans.optionId || ans.value || 3);

        if (question && question.streamWeight) {
          Object.entries(question.streamWeight).forEach(([stream, w]) => {
            streamScores[stream] = (streamScores[stream] || 0) + val * w;
          });
        }
      });

      scores = streamScores;
      const sortedStreams = Object.entries(streamScores).sort((a, b) => b[1] - a[1]);
      topCategories = sortedStreams.slice(0, 3).map(([st]) => st);

      const topStream = topCategories[0];
      if (topStream === "MPC") {
        primaryRecommendation = "MPC (Mathematics, Physics, Chemistry)";
        explanation =
          "Your assessment indicates strong interest in Mathematics, Physics, Problem Solving, and Technology. MPC is the ideal Intermediate stream for engineering, computer science, and technical degrees.";
        alternativeOptions = ["Polytechnic Diploma in CSE/ECE", "MEC (Maths, Economics, Commerce)", "BiPC"];
        recommendedTitles = ["Full-Stack Web Developer", "Machine Learning & AI Engineer", "Embedded Systems & IoT Developer", "CAD/CAM Design & CAE Simulation Engineer"];
      } else if (topStream === "BiPC") {
        primaryRecommendation = "BiPC (Biology, Physics, Chemistry)";
        explanation =
          "Your assessment shows high passion for Biology, Healthcare, Living Systems, and Medical Sciences. BiPC prepares you for Medicine (MBBS), Pharmacy, Biotechnology, and Nursing.";
        alternativeOptions = ["MPC (Maths, Physics, Chemistry)", "Paramedical Diploma", "Vocational Agriculture"];
        recommendedTitles = ["Biomedical Equipment & Medical Device Engineer", "Bioinformatics & Computational Biologist", "Clinical Psychologist"];
      } else if (topStream === "MEC") {
        primaryRecommendation = "MEC (Mathematics, Economics, Commerce)";
        explanation =
          "You demonstrated strong analytical skills combined with business, finance, and economics interests. MEC opens pathways for CA, CMA, Finance, Business Analytics, and Management.";
        alternativeOptions = ["CEC (Civics, Economics, Commerce)", "MPC", "BBA / BCom Foundation"];
        recommendedTitles = ["Financial Analyst", "Data Analyst", "Product Manager"];
      } else if (topStream === "CEC") {
        primaryRecommendation = "CEC (Civics, Economics, Commerce)";
        explanation =
          "Your interests strongly align with Law, Civics, Economics, Social Sciences, and Public Administration. CEC provides a solid foundation for Law (BA LLB) and Civil Services.";
        alternativeOptions = ["MEC (Maths, Economics, Commerce)", "Vocational / Skill Diploma"];
        recommendedTitles = ["Human Resources Manager", "Product Manager", "Digital Marketing Strategist"];
      } else if (topStream === "Polytechnic") {
        primaryRecommendation = "Polytechnic Diploma in Engineering";
        explanation =
          "You prefer practical hands-on technical work, engineering machinery, and applied electronics. A 3-year Polytechnic Diploma provides direct lateral entry into 2nd year BTech!";
        alternativeOptions = ["MPC (Intermediate)", "ITI (Industrial Training)", "Vocational Trades"];
        recommendedTitles = ["Embedded Systems & IoT Developer", "Robotics & Automation Engineer", "Power Systems & High-Voltage Engineer"];
      } else {
        primaryRecommendation = "ITI (Industrial Training Institute) / Skill Trade";
        explanation =
          "You excel in practical trade work, electrical systems, and technical machinery. ITI trade courses offer rapid employment and practical certification.";
        alternativeOptions = ["Polytechnic Diploma", "Vocational Course"];
        recommendedTitles = ["Robotics & Automation Engineer", "Power Systems & High-Voltage Engineer"];
      }
    } else if (educationLevel === "INTERMEDIATE") {
      // Intermediate Assessment Scoring
      const pathwayScores = {
        BTech_Engineering: 0,
        Healthcare_Medicine: 0,
        CA_Commerce: 0,
        Law_Govt: 0,
        Degree_BSc_BCA: 0,
      };

      answers.forEach((ans) => {
        const qId = Number(ans.questionId);
        const question = intermediateQuestions.find((q) => q.id === qId);
        const val = Number(ans.optionId || ans.value || 3);

        if (question && question.pathwayWeight) {
          Object.entries(question.pathwayWeight).forEach(([path, w]) => {
            if (path.includes("BTech")) pathwayScores.BTech_Engineering += val * w;
            else if (path.includes("Healthcare") || path.includes("Pharmacy") || path.includes("Biotech")) pathwayScores.Healthcare_Medicine += val * w;
            else if (path.includes("CA") || path.includes("BCom") || path.includes("BBA")) pathwayScores.CA_Commerce += val * w;
            else if (path.includes("Law") || path.includes("Govt") || path.includes("Defence")) pathwayScores.Law_Govt += val * w;
            else pathwayScores.Degree_BSc_BCA += val * w;
          });
        }
      });

      scores = pathwayScores;
      const sortedPathways = Object.entries(pathwayScores).sort((a, b) => b[1] - a[1]);
      topCategories = sortedPathways.slice(0, 3).map(([p]) => p);

      const topPath = topCategories[0];
      if (topPath === "BTech_Engineering") {
        primaryRecommendation = "BTech – Computer Science / Electronics Engineering";
        explanation =
          "You showed strong aptitude for Technology, Mathematics, Engineering entrance exams (AP EAPCET/JEE), and problem solving. BTech opens top software, cloud, and tech job roles.";
        alternativeOptions = ["BCA (Bachelor of Computer Applications)", "BSc Computer Science / Data Science", "BTech Electronics / Mechanical"];
        recommendedTitles = ["Full-Stack Web Developer", "Machine Learning & AI Engineer", "Cloud Architect & DevOps Engineer", "Embedded Systems & IoT Developer"];
      } else if (topPath === "Healthcare_Medicine") {
        primaryRecommendation = "Healthcare / Pharmacy / Biotechnology Degree";
        explanation =
          "Your interests center around life sciences, healthcare, pharmacy, and biological technology. Pathways include B.Pharm, BSc Biotechnology, Nursing, and Medical sciences.";
        alternativeOptions = ["BSc Biotechnology", "B.Pharm (Bachelor of Pharmacy)", "BSc Nursing / Paramedical"];
        recommendedTitles = ["Biomedical Equipment & Medical Device Engineer", "Bioinformatics & Computational Biologist", "Clinical Psychologist"];
      } else if (topPath === "CA_Commerce") {
        primaryRecommendation = "CA (Chartered Accountancy) / BCom / BBA Pathway";
        explanation =
          "You scored high in financial modeling, business acumen, and accounting principles. Pursuing CA alongside BCom or BBA provides high corporate growth.";
        alternativeOptions = ["CMA (Cost & Management Accountant)", "CS (Company Secretary)", "BBA in Finance / Analytics"];
        recommendedTitles = ["Financial Analyst", "Product Manager", "Data Analyst"];
      } else if (topPath === "Law_Govt") {
        primaryRecommendation = "Integrated Law (BA LLB) / Civil Services Preparation";
        explanation =
          "Your interests focus on Legal framework, Civics, Governance, Public Service, and Defence. BA LLB or 3-year Degree + UPSC/APPSC preparation is recommended.";
        alternativeOptions = ["BA in Economics / Political Science", "BBA LLB", "Defence Services (NDA/CDS)"];
        recommendedTitles = ["Human Resources Manager", "Product Manager"];
      } else {
        primaryRecommendation = "3-Year Degree (BCA / BSc Computer Science)";
        explanation =
          "A 3-year Degree (BCA or BSc CS/Data Science) offers a focused, cost-effective tech route with direct industry eligibility for software analyst and developer roles.";
        alternativeOptions = ["BTech Engineering", "BSc Statistics & Data Science", "BBA Information Technology"];
        recommendedTitles = ["Full-Stack Web Developer", "Data Analyst", "Cybersecurity & Information Security Specialist"];
      }
    } else {
      // BTech Assessment Scoring
      const btechScores = {
        technology: 0,
        business: 0,
        creative: 0,
        social: 0,
        analytical: 0,
        healthcare: 0,
      };

      answers.forEach((ans) => {
        const qId = Number(ans.questionId);
        const question = btechQuestions.find((q) => q.id === qId);
        if (question) {
          const val = Number(ans.optionId || ans.value || 3);
          btechScores[question.category] = (btechScores[question.category] || 0) + val;
        }
      });

      scores = btechScores;
      const sorted = Object.entries(btechScores).sort((a, b) => b[1] - a[1]);
      topCategories = sorted.slice(0, 2).map(([c]) => c);

      const mapped1 = careerMapping[topCategories[0]] || [];
      const mapped2 = careerMapping[topCategories[1]] || [];
      recommendedTitles = Array.from(new Set([...mapped1, ...mapped2])).slice(0, 6);

      primaryRecommendation = `${recommendedTitles[0] || "Software Engineer"} Job Role`;
      explanation = `Based on your technical proficiency and BTech branch skills, you are well aligned for ${recommendedTitles.slice(0, 3).join(", ")}. Prepare DSA, build 2-3 portfolio projects, and practice mock interviews.`;
      alternativeOptions = recommendedTitles.slice(1, 4);
    }

    const dbAnswers = answers.map((a) => ({
      questionId: Number(a.questionId),
      value: Number(a.optionId || a.value || 3),
    }));

    const assessment = await Assessment.create({
      user: req.user._id,
      educationLevel,
      answers: dbAnswers,
      scores,
      topCategories,
      primaryRecommendation,
      explanation,
      alternativeOptions,
      recommendedCareers: recommendedTitles,
    });

    const resultData = await formatAssessmentResult(assessment);

    res.status(201).json({
      success: true,
      message: "Assessment completed successfully",
      data: resultData,
    });
  } catch (error) {
    next(error);
  }
};

// ================================
// GET LATEST RESULT
// ================================
exports.getResult = async (req, res, next) => {
  try {
    const assessment = await Assessment.findOne({ user: req.user._id }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "No assessment found",
      });
    }

    const resultData = await formatAssessmentResult(assessment);

    res.status(200).json({
      success: true,
      data: resultData,
    });
  } catch (error) {
    next(error);
  }
};