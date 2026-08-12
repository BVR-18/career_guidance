/**
 * Roadmap Generator Utility
 * ─────────────────────────────────────────────────────
 * Dynamically generates education-level appropriate and career-specific
 * roadmap phases for CareerVerse.
 *
 * Guaranteed Task Object Structure:
 * Each task has a unique `id` (e.g. `phase-1-task-1`) and a `title`.
 */

function formatPhaseTasks(phaseId, rawTasks = []) {
  return rawTasks.map((t, idx) => {
    if (typeof t === "string") {
      return {
        id: `${phaseId}-task-${idx + 1}`,
        title: t,
      };
    }
    return {
      id: t.id || `${phaseId}-task-${idx + 1}`,
      title: t.title || `Task ${idx + 1}`,
    };
  });
}

function generateRoadmapPhases(educationLevel, career) {
  const level = (educationLevel || career?.educationLevel || "BTECH").toUpperCase();
  const careerTitle = career?.title || "Career Goal";
  const customMilestones = Array.isArray(career?.roadmap) ? career.roadmap : [];

  let rawPhases = [];

  if (level === "TENTH") {
    rawPhases = [
      {
        id: "phase-1",
        order: 1,
        stage: "Stream Selection & Orientation",
        title: `Explore Academic Streams for ${careerTitle}`,
        description: `Understand the high school streams (MPC, BiPC, MEC, CEC, Polytechnic) relevant to ${careerTitle} and align your interest.`,
        tasks: [
          `Research how 10th subjects connect to ${careerTitle}`,
          "Compare 2-year Intermediate vs 3-year Polytechnic Diploma",
          "Identify target Junior Colleges or Polytechnic institutes",
        ],
      },
      {
        id: "phase-2",
        order: 2,
        stage: "Foundational Academic Skills",
        title: "Master Core 10th Subjects & Problem Solving",
        description: "Strengthen fundamental mathematics, science, and logical reasoning required for higher secondary entrance.",
        tasks: [
          "Complete 10th Board Exam syllabus with strong scores",
          "Practice logical reasoning and basic analytical puzzles",
          "Develop daily study habits and computer literacy basics",
        ],
      },
      {
        id: "phase-3",
        order: 3,
        stage: "Entrance & Enrollment Prep",
        title: "Higher Secondary Admission Preparation",
        description: "Prepare for 10th Board exams and entrance tests like POLYCET or college admissions.",
        tasks: [
          "Appear for 10th Board Examinations",
          "Take entrance exams (POLYCET / College Aptitude Tests) if applicable",
          "Finalize enrollment in target stream (MPC / BiPC / MEC / CEC / Diploma)",
        ],
      },
      {
        id: "phase-4",
        order: 4,
        stage: "Early Skill Building",
        title: `Introductory Skill Exploration for ${careerTitle}`,
        description: `Begin basic exploration of tools, concepts, and foundational skills needed for ${careerTitle}.`,
        tasks: [
          customMilestones[0] || `Learn basic introductory concepts related to ${careerTitle}`,
          "Explore free online introductory workshops and tutorials",
          "Build habit of active curiosity and domain reading",
        ],
      },
      {
        id: "phase-5",
        order: 5,
        stage: "Transition to Next Stage",
        title: "Transition to Higher Secondary Education",
        description: "Successfully begin Intermediate or Polytechnic studies with a clear long-term career roadmap.",
        tasks: [
          "Join 11th Class / 1st Year Diploma coursework",
          "Set 2-year academic goals for upcoming entrance exams",
        ],
      },
    ];
  } else if (level === "INTERMEDIATE") {
    rawPhases = [
      {
        id: "phase-1",
        order: 1,
        stage: "Higher Secondary & Entrance Mastery",
        title: "Master Board Syllabus & Competitive Entrances",
        description: `Achieve high scores in Intermediate exams and prepare for key entrance tests (AP EAPCET, JEE, CLAT, NEET, CA Foundation) for ${careerTitle}.`,
        tasks: [
          "Master 11th & 12th core subject fundamentals",
          "Solve previous years' entrance exam question papers",
          "Maintain strong academic GPA in Intermediate Board exams",
        ],
      },
      {
        id: "phase-2",
        order: 2,
        stage: "Degree & Course Selection",
        title: `Choose Degree Program for ${careerTitle}`,
        description: "Evaluate undergraduate degrees (BTech, BCA, BSc, BCom, BBA, Law, Pharmacy) best suited for your target career.",
        tasks: [
          `Research target degree courses and top colleges for ${careerTitle}`,
          "Participate in state or national entrance counseling sessions",
          "Finalize admission into target undergraduate program",
        ],
      },
      {
        id: "phase-3",
        order: 3,
        stage: "Core Domain Fundamentals",
        title: `Build Essential Skills for ${careerTitle}`,
        description: `Learn the core technical or professional foundations necessary for success in ${careerTitle}.`,
        tasks: [
          customMilestones[0] || `Master foundational principles of ${careerTitle}`,
          customMilestones[1] || "Learn essential software tools, languages, or analytical methods",
          "Complete beginner mini-projects or case studies",
        ],
      },
      {
        id: "phase-4",
        order: 4,
        stage: "Practical Projects & Exposure",
        title: "Practical Skill Building & Mini-Projects",
        description: "Apply your learning by creating starter projects, presentations, or domain exercises.",
        tasks: [
          customMilestones[2] || `Build 1-2 beginner projects relevant to ${careerTitle}`,
          "Build a beginner GitHub/Portfolio profile to showcase your work",
          "Participate in student workshops or online hackathons/competitions",
        ],
      },
      {
        id: "phase-5",
        order: 5,
        stage: "Higher Education Onboarding",
        title: "Transition to Undergraduate Career Path",
        description: "Step confidently into college degree studies with a head start on core skills and career clarity.",
        tasks: [
          "Join college degree program with strong foundation",
          "Connect with student clubs, seniors, and academic mentors",
        ],
      },
    ];
  } else {
    // BTECH / Undergraduate Level
    rawPhases = [
      {
        id: "phase-1",
        order: 1,
        stage: "Core Engineering & Technical Fundamentals",
        title: `Master Core Fundamentals for ${careerTitle}`,
        description: `Build rigorous command over foundational concepts, programming, and core subjects required for ${careerTitle}.`,
        tasks: [
          customMilestones[0] || `Master core theory & principles for ${careerTitle}`,
          "Build strong foundation in algorithms, data structures, or domain logic",
          "Practice regular hands-on problem solving",
        ],
      },
      {
        id: "phase-2",
        order: 2,
        stage: "Advanced Domain Tools & Frameworks",
        title: `Deepen Advanced Skills in ${careerTitle}`,
        description: `Gain hands-on expertise with industry-standard tools, frameworks, and modern technologies.`,
        tasks: [
          customMilestones[1] || `Learn advanced tools & frameworks used in ${careerTitle}`,
          "Build proficiency with industry developer workflows and version control",
          "Implement mid-level practical applications and component systems",
        ],
      },
      {
        id: "phase-3",
        order: 3,
        stage: "Production Capstone Projects",
        title: "Build Real-World Portfolio & Projects",
        description: "Develop 2-3 production-grade capstone projects demonstrating end-to-end expertise and architecture.",
        tasks: [
          customMilestones[2] || "Build full-featured capstone project with clean architecture",
          "Deploy projects live with documentation and source code on GitHub",
          "Perform code reviews and optimize project performance",
        ],
      },
      {
        id: "phase-4",
        order: 4,
        stage: "Internship & Industry Experience",
        title: "Gain Industry Experience & Exposure",
        description: "Apply your skills in real-world settings through internships, open-source contributions, or industrial training.",
        tasks: [
          customMilestones[3] || "Apply for internships, freelance gigs, or research assistantships",
          "Contribute to open-source software or collaborative team projects",
          "Build professional network on LinkedIn and engage with industry peers",
        ],
      },
      {
        id: "phase-5",
        order: 5,
        stage: "Placement & Interview Readiness",
        title: "Technical Resume & Placement Preparation",
        description: "Prepare case studies, refine portfolio links, and practice mock technical and behavioral interviews.",
        tasks: [
          "Create ATS-friendly professional resume showcasing projects & skills",
          "Practice mock technical interviews, coding rounds, and system design",
          "Apply for campus placements and off-campus career drives",
        ],
      },
    ];
  }

  return rawPhases.map((phase) => ({
    ...phase,
    tasks: formatPhaseTasks(phase.id, phase.tasks),
  }));
}

module.exports = { generateRoadmapPhases, formatPhaseTasks };
