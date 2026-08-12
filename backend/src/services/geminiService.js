const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const fallbackAdviceByLevel = {
  TENTH: (query) => {
    const q = (query || "").toLowerCase();
    if (q.includes("mpc") || q.includes("math")) {
      return `### MPC (Maths, Physics, Chemistry) Stream Guidance

**Why choose MPC?**
If you love mathematics, physics, numerical problem solving, and technology, MPC is the ideal 2-year Intermediate choice.

**Future Career & Education Pathways:**
- **BTech Engineering** (Computer Science, ECE, EEE, Mechanical, Civil, AI & ML) via AP EAPCET / JEE Main.
- **BCA & BSc Computer Science** (3-year software & data degrees).
- **Architecture (B.Arch)** & National Defence Academy (**NDA Defence Officers**).

**Next Step Advice:**
Focus on building strong fundamentals in 10th Class Mathematics & Physics formulas before starting Intermediate!`;
    }

    if (q.includes("bipc") || q.includes("bio") || q.includes("doctor")) {
      return `### BiPC (Biology, Physics, Chemistry) Stream Guidance

**Why choose BiPC?**
If you are fascinated by living organisms, human physiology, biology, and healthcare, BiPC is your key gateway.

**Future Career & Education Pathways:**
- **Medical (MBBS / BDS)** via NEET entrance.
- **Pharmacy (B.Pharm & Pharm.D)** via AP EAPCET Pharma stream.
- **BSc Biotechnology, Agricultural Sciences, Nursing & Paramedical**.

**Next Step Advice:**
Pay special attention to Botany, Zoology, and Organic Chemistry concepts!`;
    }

    if (q.includes("polytechnic") || q.includes("diploma")) {
      return `### Polytechnic 3-Year Technical Diploma Guidance

**Why choose Polytechnic after 10th?**
If you prefer hands-on technical training rather than 2 years of general Intermediate science theory, Polytechnic is a great choice!

**Key Benefits:**
- **Lateral Entry into BTech:** Direct entry into 2nd year BTech via **ECET** in Andhra Pradesh!
- **Branches Available:** Computer Science, Electronics (ECE), Mechanical, Civil, Electrical.
- **Early Employment:** Qualify for junior engineer and technical roles at age 18.`;
    }

    return `### Post-10th Career Guidance Overview

To choose the right path after 10th class:
1. **MPC (Maths, Physics, Chemistry):** Best for Engineering, Software, Architecture, and Defense.
2. **BiPC (Biology, Physics, Chemistry):** Best for Medicine, Pharmacy, Biotech, and Agriculture.
3. **MEC / CEC:** Best for Chartered Accountancy (CA), BCom, BBA, Finance, and Law.
4. **Polytechnic Diploma:** 3-year technical diploma allowing direct 2nd-year BTech lateral entry via ECET.
5. **ITI Trades:** 1-2 year practical trade certificates in Electrician, Fitter, or Motor Mechanic.

*Tip: Take our 10th Career Assessment on the dashboard for a personalized stream score!*`;
  },

  INTERMEDIATE: (query) => {
    const q = (query || "").toLowerCase();
    if (q.includes("btech") || q.includes("engineering")) {
      return `### BTech Engineering Pathway After Intermediate

**What is BTech?**
Bachelor of Technology (BTech) is a 4-year professional engineering degree.

**Entrance & Admissions in AP:**
- **AP EAPCET (EAMCET):** Primary state counseling entrance for engineering college seats in Andhra Pradesh.
- **JEE Main:** National entrance for NITs, IIITs, and top deemed universities.

**Major Branches:**
- **CSE & AI/ML:** Software development, artificial intelligence, cloud, data engineering.
- **ECE & EEE:** Embedded IoT, chip design (VLSI), renewable energy, automation.
- **Mechanical & Civil:** CAD design, EV powertrains, structural infrastructure.`;
    }

    if (q.includes("bca") || q.includes("bsc") || q.includes("degree")) {
      return `### 3-Year Degree Options After Intermediate

**Top Non-BTech Degree Pathways:**
1. **BCA (Bachelor of Computer Applications):** 3-year practical tech degree focused on web development, databases, and software coding.
2. **BSc Computer Science / Data Science:** Combines mathematics, statistics, Python, and data analytics.
3. **BCom & BBA:** Premier business degrees for corporate finance, marketing, and management.
4. **BA:** Ideal for Civil Services (UPSC/APPSC), Law, and Public Policy.`;
    }

    return `### Post-Intermediate Guidance Summary

After completing 12th / Intermediate:
- **Engineering Pathway:** 4-year BTech via AP EAPCET / JEE Main.
- **Computer & Science Degrees:** 3-year BCA or BSc (Computer Science / Data Science).
- **Commerce & Management:** BCom, BBA, Chartered Accountancy (CA), CMA, CS.
- **Professional & Law:** Integrated 5-year BA LLB, Pharmacy (B.Pharm), Nursing, Agriculture.
- **Defence & Govt:** UPSC NDA / CDS, Banking, SSC, and State Service exams.`;
  },

  BTECH: (query) => {
    const q = (query || "").toLowerCase();
    if (q.includes("interview") || q.includes("full-stack") || q.includes("web")) {
      return `### Full-Stack Web Developer Preparation Strategy

**1. Frontend Core:**
- Master HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, and TypeScript.
- Build 2-3 responsive web apps with state management (Redux/Zustand).

**2. Backend & Databases:**
- Learn Node.js, Express framework, REST API design, and JWT authentication.
- Work with relational (PostgreSQL) and NoSQL (MongoDB) databases.

**3. System Design & Deployment:**
- Understand API caching (Redis), Docker containerization, and cloud deployment (AWS/Vercel).

**Interview Tip:** Have a live GitHub link and hosted demo URL for every project on your resume!`;
    }

    if (q.includes("dsa") || q.includes("coding") || q.includes("system design")) {
      return `### DSA & Technical Coding Interview Roadmap

**Step-by-step DSA Preparation:**
1. **Language Choice:** Select C++, Java, or Python and master standard data structures.
2. **Core Data Structures:** Arrays, Strings, Hash Maps, Linked Lists, Stacks, Queues, Binary Trees, Graphs.
3. **Algorithms:** Two Pointers, Binary Search, Sliding Window, DFS/BFS, Dynamic Programming.
4. **Target Goals:** Solve 150-200 curated questions on LeetCode / HackerRank.

**Mock Practice:** Practice writing clean code and explaining your thought process out loud.`;
    }

    if (q.includes("project") || q.includes("resume")) {
      return `### Resume Capstone Project Ideas for BTech Students

**Recommended Production-Grade Projects:**
1. **CareerVerse / EdTech Platform:** Full-stack React + Node.js app with auth, recommendation engine, and dashboards.
2. **AI Resume Shortlister / Analyzer:** Python + FastAPI + OpenAI/Gemini NLP model for resume parsing.
3. **IoT Smart Energy / Embedded Monitor (for ECE/EEE):** STM32 / ESP32 sensor node sending real-time telemetry to MQTT dashboard.
4. **EV Drivetrain CAD / FEA Simulation (for Mechanical):** Parametric SolidWorks model + ANSYS thermal stress report.`;
    }

    return `### BTech Engineering Career Readiness Guide

**Key Action Steps for BTech Job Placements:**
1. **Branch Skill Focus:** Align your core projects with your BTech branch (CSE/IT, ECE, EEE, Mech, Civil).
2. **DSA & Problem Solving:** Practice coding patterns and algorithmic complexity (Big-O).
3. **Portfolio & Projects:** Host 2-3 capstone projects on GitHub with full documentation.
4. **Resume Optimization:** Use single-page ATS-friendly formatting with quantified achievements.`;
  },
};

async function askCareerAI(prompt, educationLevel = "BTECH") {
  try {
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
    let responseText = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });
        if (response && response.text) {
          responseText = response.text;
          break;
        }
      } catch (err) {
        if (err?.status === "RESOURCE_EXHAUSTED" || err?.status === 429) {
          break;
        }
      }
    }

    if (responseText) {
      return responseText;
    }
  } catch (error) {
    console.error("Gemini AI API Call Failed, switching to built-in advisor fallback.");
  }

  const levelKey = (educationLevel || "BTECH").toUpperCase();
  const fallbackFn = fallbackAdviceByLevel[levelKey] || fallbackAdviceByLevel.BTECH;
  return fallbackFn(prompt);
}

module.exports = {
  askCareerAI,
};