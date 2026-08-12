/**
 * Category-Aware Assessment Questions for CareerVerse
 * Supports: TENTH, INTERMEDIATE, and BTECH student levels
 */

const tenthQuestions = [
  {
    id: 101,
    question: "I love solving mathematical equations, algebra, and numerical problems.",
    category: "math",
    streamWeight: { MPC: 5, MEC: 4, Polytechnic: 3, BiPC: 1, CEC: 1 },
  },
  {
    id: 102,
    question: "I am deeply curious about physics, chemistry experiments, and how physical machines work.",
    category: "physical_science",
    streamWeight: { MPC: 5, Polytechnic: 4, BiPC: 3, ITI: 3, MEC: 1 },
  },
  {
    id: 103,
    question: "I am fascinated by living organisms, plant/human biology, healthcare, and medicine.",
    category: "biology",
    streamWeight: { BiPC: 5, Vocational: 3, MPC: 1, CEC: 1 },
  },
  {
    id: 104,
    question: "I enjoy learning about business, commerce, stock markets, and how money works.",
    category: "commerce",
    streamWeight: { MEC: 5, CEC: 4, Vocational: 2 },
  },
  {
    id: 105,
    question: "I am interested in civics, politics, law, history, and social systems.",
    category: "social_studies",
    streamWeight: { CEC: 5, MEC: 3, Vocational: 2 },
  },
  {
    id: 106,
    question: "I enjoy working on computers, websites, games, apps, and electronic gadgets.",
    category: "technology",
    streamWeight: { MPC: 5, Polytechnic: 4, MEC: 3, ITI: 2 },
  },
  {
    id: 107,
    question: "I prefer practical hands-on technical training, electrical wiring, tools, or mechanical trade work.",
    category: "hands_on",
    streamWeight: { Polytechnic: 5, ITI: 5, MPC: 2 },
  },
  {
    id: 108,
    question: "I want to become an engineer, software developer, or technologist in the future.",
    category: "aspire_engineering",
    streamWeight: { MPC: 5, Polytechnic: 4, ITI: 2 },
  },
  {
    id: 109,
    question: "I want to become a doctor, surgeon, pharmacist, or healthcare professional.",
    category: "aspire_medicine",
    streamWeight: { BiPC: 5, Vocational: 2 },
  },
  {
    id: 110,
    question: "I aspire to become a Chartered Accountant (CA), business administrator, or financial analyst.",
    category: "aspire_business",
    streamWeight: { MEC: 5, CEC: 4 },
  },
];

const intermediateQuestions = [
  {
    id: 201,
    question: "I want to pursue a 4-year BTech engineering degree through entrance exams like AP EAPCET / JEE.",
    category: "btech_interest",
    pathwayWeight: { BTech_Engineering: 5, Degree_BCA: 3, BSc: 2 },
  },
  {
    id: 202,
    question: "I am passionate about Computer Science, software development, coding, or AI/ML.",
    category: "computer_science",
    pathwayWeight: { BTech_CSE: 5, Degree_BCA: 4, BSc_CS: 4 },
  },
  {
    id: 203,
    question: "I want to pursue medicine (MBBS/BDS), Pharmacy (B.Pharm), Biotechnology, or Nursing.",
    category: "medical_pharma",
    pathwayWeight: { Healthcare_Medicine: 5, Pharmacy_BPharm: 5, BSc_Biotech: 4 },
  },
  {
    id: 204,
    question: "I want to become a Chartered Accountant (CA), Company Secretary (CS), or Finance Leader.",
    category: "finance_ca",
    pathwayWeight: { CA_Professional: 5, Degree_BCom: 4, Degree_BBA: 4 },
  },
  {
    id: 205,
    question: "I am interested in Law (BA LLB / BBA LLB) or Legal Consultancy.",
    category: "law",
    pathwayWeight: { Law_BALLB: 5, Degree_BA: 3 },
  },
  {
    id: 206,
    question: "I am preparing or interested in Civil Services (UPSC), State Public Services, Banking, or Defence.",
    category: "govt_competitive",
    pathwayWeight: { Govt_Services: 5, Defence_NDA: 4, Degree_BA: 3 },
  },
  {
    id: 207,
    question: "I prefer a 3-year undergraduate degree (BSc / BCom / BA / BCA) over a 4-year BTech degree.",
    category: "degree_preference",
    pathwayWeight: { Degree_BSc: 4, Degree_BCA: 4, Degree_BCom: 4, Degree_BA: 4 },
  },
  {
    id: 208,
    question: "I prefer practical hardware electronics, microcontrollers, embedded systems, or robotics.",
    category: "hardware_ece",
    pathwayWeight: { BTech_ECE: 5, BTech_EEE: 4, BTech_Robotics: 4 },
  },
  {
    id: 209,
    question: "I am interested in mechanical machinery, CAD design, automotive, or civil infrastructure.",
    category: "core_mech_civil",
    pathwayWeight: { BTech_Mechanical: 5, BTech_Civil: 5 },
  },
  {
    id: 210,
    question: "I am interested in hotel management, design/animation, or creative media industries.",
    category: "creative_design",
    pathwayWeight: { Design_Media: 5, Hotel_Management: 4 },
  },
];

const btechQuestions = [
  {
    id: 301,
    question: "I enjoy solving Data Structures & Algorithms (DSA) and competitive programming challenges.",
    category: "technology",
  },
  {
    id: 302,
    question: "I prefer frontend/backend web or mobile application development using modern stacks.",
    category: "technology",
  },
  {
    id: 303,
    question: "I am interested in Artificial Intelligence, Machine Learning, and predictive data analysis.",
    category: "analytical",
  },
  {
    id: 304,
    question: "I enjoy Cloud computing (AWS/Azure), DevOps automation, or Cybersecurity.",
    category: "technology",
  },
  {
    id: 305,
    question: "I prefer hardware design, Microcontrollers, Embedded C/C++, IoT, or VLSI chip design.",
    category: "technology",
  },
  {
    id: 306,
    question: "I prefer CAD 3D modeling, FEA structural analysis, or core mechanical/civil engineering.",
    category: "analytical",
  },
  {
    id: 307,
    question: "I enjoy product management, business analytics, or leading engineering project teams.",
    category: "business",
  },
  {
    id: 308,
    question: "I am actively building capstone software/hardware projects for my portfolio.",
    category: "technology",
  },
  {
    id: 309,
    question: "I am preparing for GATE, higher studies (MS/MTech), or PSU government technical jobs.",
    category: "analytical",
  },
  {
    id: 310,
    question: "I am preparing for technical mock interviews, system design, and resume shortlisting.",
    category: "business",
  },
];

module.exports = {
  tenthQuestions,
  intermediateQuestions,
  btechQuestions,
  // Backward compatibility default
  assessmentQuestions: btechQuestions,
};