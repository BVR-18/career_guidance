/**
 * SEED DATA — CareerVerse Multi-Category Architecture
 * ─────────────────────────────────────────────────────
 * Non-overlapping career & course datasets for:
 *   - 10th Class Students (TENTH: MPC, BiPC, MEC, CEC, Polytechnic, ITI)
 *   - Intermediate Students (INTERMEDIATE: BTech Degree, BSc, BCA, BCom, BA, BBA, CA, Law, Pharmacy, Govt Jobs)
 *   - BTech Students (BTECH: Branch-mapped engineering & technology job roles)
 * ─────────────────────────────────────────────────────
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Career = require("../models/Career");
const User = require("../models/User");

const careers = [
  // ====================================================
  // 1. 10TH CLASS STUDENT DATASET (educationLevel: TENTH)
  // ====================================================
  {
    title: "MPC (Maths, Physics, Chemistry)",
    description:
      "2-year Intermediate physical science stream focusing on mathematics, physics, and chemistry. Ideal for students aspiring toward engineering, computer science, architecture, defense, and physical science degrees.",
    category: "technology",
    branch: "Physical Sciences & Math",
    educationLevel: "TENTH",
    careerType: "INTERMEDIATE_STREAM",
    skills: ["Mathematics", "Physics", "Chemistry", "Analytical Problem Solving", "Logical Reasoning"],
    roadmap: [
      "Select MPC in Intermediate / Junior College",
      "Focus on 11th & 12th Board Syllabus + Entrance Fundamentals",
      "Prepare for AP EAPCET (EAMCET) / JEE Main entrance exams",
      "Choose BTech Engineering, BSc Computer Science, or BCA after Intermediate"
    ],
    salary: { min: 0, max: 0, currency: "INR" },
  },
  {
    title: "BiPC (Biology, Physics, Chemistry)",
    description:
      "2-year Intermediate biological science stream focusing on botany, zoology, physics, and chemistry. Ideal for students passionate about medicine, healthcare, pharmacy, agriculture, and biotechnology.",
    category: "healthcare",
    branch: "Life Sciences & Medicine",
    educationLevel: "TENTH",
    careerType: "INTERMEDIATE_STREAM",
    skills: ["Botany", "Zoology", "Physics", "Chemistry", "Biological Analysis", "Healthcare Interest"],
    roadmap: [
      "Select BiPC in Intermediate / Junior College",
      "Study Human Physiology, Genetics, Organic Chemistry, and Physics",
      "Prepare for NEET / AP EAPCET (Pharma/Agri) entrance exams",
      "Pursue MBBS, B.Pharm, BSc Biotech, Nursing, or Agriculture after Intermediate"
    ],
    salary: { min: 0, max: 0, currency: "INR" },
  },
  {
    title: "MEC (Maths, Economics, Commerce)",
    description:
      "2-year Intermediate commerce stream blending advanced mathematics with economics and accountancy. Ideal for students aiming for Chartered Accountancy (CA), Finance, Economics, and Business Analytics.",
    category: "business",
    branch: "Commerce & Finance",
    educationLevel: "TENTH",
    careerType: "INTERMEDIATE_STREAM",
    skills: ["Mathematics", "Accountancy", "Economics", "Financial Logic", "Business Communication"],
    roadmap: [
      "Select MEC in Intermediate / Junior College",
      "Master Accounting basics, Microeconomics, and Business Mathematics",
      "Enroll in CA Foundation / CMA Foundation alongside Intermediate",
      "Pursue BCom, BBA, CA, or Business Analytics after Intermediate"
    ],
    salary: { min: 0, max: 0, currency: "INR" },
  },
  {
    title: "CEC (Civics, Economics, Commerce)",
    description:
      "2-year Intermediate arts & commerce stream focusing on civics, public administration, economics, and business studies. Ideal for Law (BA LLB), Civil Services, Corporate Governance, and Management.",
    category: "social",
    branch: "Arts, Law & Civics",
    educationLevel: "TENTH",
    careerType: "INTERMEDIATE_STREAM",
    skills: ["Civics", "Political Science", "Economics", "Commerce", "Public Speaking", "Legal Aptitude"],
    roadmap: [
      "Select CEC in Intermediate / Junior College",
      "Study Indian Constitution, Economic Systems, and Commerce Principles",
      "Prepare for CLAT / Law CET or Civil Services Foundation",
      "Pursue Integrated BA LLB, BCom, BBA, or Public Administration"
    ],
    salary: { min: 0, max: 0, currency: "INR" },
  },
  {
    title: "Polytechnic Diploma in Engineering",
    description:
      "3-year practical technical engineering diploma program in CSE, ECE, Mechanical, or Civil. Enables direct lateral entry into 2nd year BTech via ECET in Andhra Pradesh!",
    category: "technology",
    branch: "Applied Engineering",
    educationLevel: "TENTH",
    careerType: "POST_10TH_COURSE",
    skills: ["Applied Mathematics", "Engineering Physics", "Technical CAD", "Workshop Practice", "Coding / Circuits"],
    roadmap: [
      "Appear for POLYCET Entrance Exam after 10th Class",
      "Select Diploma Branch (CSE, ECE, Mechanical, or Civil)",
      "Complete 3-year hands-on Polytechnic lab coursework",
      "Write ECET for direct lateral entry into 2nd year BTech OR enter technical employment"
    ],
    salary: { min: 250000, max: 500000, currency: "INR" },
  },
  {
    title: "ITI (Industrial Training Institute) Trades",
    description:
      "1 to 2-year vocational trade certification in Electrician, Fitter, Machinist, Motor Mechanic, or Electronics for practical industrial trade careers.",
    category: "analytical",
    branch: "Industrial Vocational Trades",
    educationLevel: "TENTH",
    careerType: "POST_10TH_COURSE",
    skills: ["Electrical Wiring", "Fitting & Tooling", "Machining", "Trade Safety", "Blueprint Reading"],
    roadmap: [
      "Enroll in recognized Government or Private ITI Institute after 10th",
      "Complete NCVT / SCVT Trade Certification with practical workshop hours",
      "Undergo 1-year Industrial Apprenticeship",
      "Join public/private manufacturing industries or start technical trade enterprise"
    ],
    salary: { min: 200000, max: 450000, currency: "INR" },
  },
  {
    title: "Vocational & Skill-Based Certification",
    description:
      "Short-term job-oriented vocational diplomas in Computer Applications, Graphic Design, Multimedia, or Retail Operations for rapid employment.",
    category: "creative",
    branch: "Applied Vocational Skills",
    educationLevel: "TENTH",
    careerType: "POST_10TH_COURSE",
    skills: ["Computer Fundamentals", "MS Office / DTP", "Graphic Tools", "Communication", "Customer Support"],
    roadmap: [
      "Select specialized Vocational Trade Certificate after 10th",
      "Gain practical lab and internship certification",
      "Build initial portfolio / technical work samples",
      "Apply for junior technician, desktop operator, or assistant roles"
    ],
    salary: { min: 180000, max: 400000, currency: "INR" },
  },

  // ====================================================
  // 2. INTERMEDIATE STUDENT DATASET (educationLevel: INTERMEDIATE)
  // ====================================================
  {
    title: "BTech Engineering Degree",
    description:
      "4-year professional engineering degree (CSE, IT, AI & DS, ECE, EEE, Mechanical, Civil, Chemical, Biotech). Admissions in AP via AP EAPCET / JEE Main ranks.",
    category: "technology",
    branch: "Engineering & Technology",
    educationLevel: "INTERMEDIATE",
    careerType: "DEGREE_COURSE",
    skills: ["Physics & Math Foundation", "Coding Interest", "Analytical Problem Solving", "Engineering Design"],
    roadmap: [
      "Appear for AP EAPCET / JEE Main entrance exams in Intermediate 2nd Year",
      "Participate in State Engineering Counseling & choose preferred branch/college",
      "Complete 4-year BTech engineering curriculum with projects & internships",
      "Graduate into campus placements, software roles, or higher studies (GATE/GRE)"
    ],
    salary: { min: 450000, max: 2500000, currency: "INR" },
  },
  {
    title: "BCA (Bachelor of Computer Applications)",
    description:
      "3-year undergraduate degree focusing on software programming, web development, database management, and computer applications.",
    category: "technology",
    branch: "Computer Applications",
    educationLevel: "INTERMEDIATE",
    careerType: "DEGREE_COURSE",
    skills: ["C/C++", "Java", "Web Development", "SQL Databases", "Software Logic"],
    roadmap: [
      "Apply for BCA degree in recognized degree colleges after Intermediate",
      "Master programming languages, data structures, and web technologies",
      "Build 2-3 web or mobile software projects",
      "Apply for software developer roles or pursue MCA (Master of Computer Applications)"
    ],
    salary: { min: 350000, max: 1200000, currency: "INR" },
  },
  {
    title: "BSc Computer Science & Data Science",
    description:
      "3-year science degree combining computer science theory, mathematics, statistics, data analytics, and software programming.",
    category: "analytical",
    branch: "Science & Computing",
    educationLevel: "INTERMEDIATE",
    careerType: "DEGREE_COURSE",
    skills: ["Python", "Statistics", "Data Analytics", "Mathematics", "SQL"],
    roadmap: [
      "Join BSc CS / Data Science degree program after Intermediate",
      "Study advanced calculus, probability, Python programming, and machine learning basics",
      "Complete capstone data analysis projects",
      "Target roles as Data Analyst, Junior Developer, or pursue MSc Data Science"
    ],
    salary: { min: 380000, max: 1400000, currency: "INR" },
  },
  {
    title: "BCom & BBA (Commerce & Business)",
    description:
      "3-year degree in Commerce, Accounting, Finance, Marketing, and Business Administration for corporate business careers.",
    category: "business",
    branch: "Commerce & Business Management",
    educationLevel: "INTERMEDIATE",
    careerType: "DEGREE_COURSE",
    skills: ["Financial Accounting", "Corporate Law", "Marketing Strategy", "Business Analytics", "Excel"],
    roadmap: [
      "Enroll in BCom (Honours/Computers) or BBA program after Intermediate",
      "Master corporate accounting, tax law, and digital business tools",
      "Gain internship experience in corporate finance or marketing firms",
      "Enter corporate employment or pursue MBA / CA"
    ],
    salary: { min: 350000, max: 1500000, currency: "INR" },
  },
  {
    title: "BA (Humanities & Civil Services Prep)",
    description:
      "3-year Bachelor of Arts degree in Economics, Political Science, History, or Public Administration — excellent for UPSC Civil Services and APPSC exams.",
    category: "social",
    branch: "Humanities & Social Sciences",
    educationLevel: "INTERMEDIATE",
    careerType: "DEGREE_COURSE",
    skills: ["Political Science", "Economics", "Essay Writing", "Analytical Reasoning", "General Studies"],
    roadmap: [
      "Join BA program in top degree colleges after Intermediate",
      "Build deep general knowledge and essay writing skills for competitive exams",
      "Start Civil Services / Public Service exam preparation alongside graduation",
      "Appear for UPSC IAS/IPS, APPSC Group 1/2 exams upon completing degree"
    ],
    salary: { min: 400000, max: 1800000, currency: "INR" },
  },
  {
    title: "CA (Chartered Accountancy) & CMA & CS",
    description:
      "Prestigious professional certifications offered by ICAI, ICMAI, and ICSI for auditing, taxation, corporate finance, and secretarial governance.",
    category: "business",
    branch: "Professional Finance & Law",
    educationLevel: "INTERMEDIATE",
    careerType: "PROFESSIONAL_COURSE",
    skills: ["Advanced Accounting", "Taxation Laws", "Corporate Auditing", "Financial Reporting", "Ethics"],
    roadmap: [
      "Register for CA Foundation / CMA Foundation exam after Intermediate",
      "Pass Intermediate Level exams and complete 2-3 years Articleship Training",
      "Pass CA Final examination to earn Chartered Accountant designation",
      "Join top accounting firms (Big 4), MNCs, or establish independent practice"
    ],
    salary: { min: 700000, max: 2500000, currency: "INR" },
  },
  {
    title: "Integrated Law (BA LLB / BBA LLB)",
    description:
      "5-year integrated professional law degree covering constitutional law, corporate law, criminal law, and court advocacy.",
    category: "social",
    branch: "Legal Studies",
    educationLevel: "INTERMEDIATE",
    careerType: "PROFESSIONAL_COURSE",
    skills: ["Constitutional Law", "Legal Drafting", "Argumentation", "Moot Court", "Research"],
    roadmap: [
      "Write CLAT / AP LAWCET entrance exam in Intermediate 2nd Year",
      "Join 5-year integrated BA LLB / BBA LLB program at Law University",
      "Participate in Moot Court competitions and intern with Advocates / Corporate Law firms",
      "Register with State Bar Council to practice law or join corporate legal teams"
    ],
    salary: { min: 500000, max: 2000000, currency: "INR" },
  },
  {
    title: "Pharmacy (B.Pharm) & Nursing",
    description:
      "4-year professional healthcare programs in pharmaceutical drug manufacturing, clinical pharmacology, and hospital patient care.",
    category: "healthcare",
    branch: "Pharmaceutical & Health Sciences",
    educationLevel: "INTERMEDIATE",
    careerType: "PROFESSIONAL_COURSE",
    skills: ["Pharmacology", "Medicinal Chemistry", "Clinical Care", "Drug Formulation", "Hospital Protocols"],
    roadmap: [
      "Qualify in AP EAPCET (BiPC stream) or Nursing entrance exam",
      "Join 4-year B.Pharm or BSc Nursing degree at recognized institution",
      "Complete hospital internships and laboratory research projects",
      "Join pharmaceutical MNCs, clinical research organizations, or hospitals"
    ],
    salary: { min: 380000, max: 1400000, currency: "INR" },
  },
  {
    title: "BSc Agriculture & Allied Sciences",
    description:
      "4-year professional agricultural science degree covering agronomy, soil science, crop biotechnology, and agricultural technology.",
    category: "healthcare",
    branch: "Agricultural Sciences",
    educationLevel: "INTERMEDIATE",
    careerType: "PROFESSIONAL_COURSE",
    skills: ["Agronomy", "Soil Chemistry", "Crop Genetics", "Agri-Business", "Sustainable Farming"],
    roadmap: [
      "Secure rank in AP EAPCET Agriculture stream",
      "Complete 4-year BSc (Hons) Agriculture program at State Agri University",
      "Participate in Rural Agricultural Work Experience (RAWE) programs",
      "Join Agri-tech companies, Fertilizer MNCs, Bank Agri Officer roles, or Govt Agri department"
    ],
    salary: { min: 400000, max: 1500000, currency: "INR" },
  },
  {
    title: "Defence (NDA / CDS) & Government Careers",
    description:
      "Prestigious officer recruitment pathways into Indian Army, Navy, Air Force via NDA (after 12th) or CDS (after graduation), plus Banking and SSC.",
    category: "social",
    branch: "National Defence & Public Service",
    educationLevel: "INTERMEDIATE",
    careerType: "COMPETITIVE_PATHWAY",
    skills: ["Physical Fitness", "General Ability", "Leadership", "Mathematics", "Current Affairs"],
    roadmap: [
      "Appear for UPSC NDA Written Exam & SSB Interview during/after Intermediate",
      "Undergo 3-year training at National Defence Academy (Khadakwasla)",
      "Get commissioned as Lieutenant / Flying Officer / Sub-Lieutenant in Armed Forces",
      "Alternatively, pursue graduation and write CDS / UPSC / SSC CGL / Bank PO exams"
    ],
    salary: { min: 650000, max: 2200000, currency: "INR" },
  },

  // ====================================================
  // 3. BTECH STUDENT DATASET (educationLevel: BTECH)
  // Strictly Engineering & Tech Job Roles (No Medical Practitioners)
  // ====================================================

  // --- CSE / IT BRANCH ---
  {
    title: "Full-Stack Web Developer",
    description:
      "Design, build, and maintain web applications from database architecture to browser UIs using modern JavaScript frameworks, REST APIs, and cloud services.",
    category: "technology",
    branch: "Computer Science (CSE/IT)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker", "Git", "REST APIs", "TypeScript"],
    roadmap: [
      "Master HTML5, CSS3, Modern JavaScript (ES6+)",
      "Build interactive frontend applications with React & Tailwind CSS",
      "Develop secure RESTful backend APIs with Node.js and Express",
      "Design relational (PostgreSQL) and NoSQL (MongoDB) databases",
      "Deploy apps with Docker, CI/CD pipelines, and AWS/Vercel",
      "Build 3 production capstone full-stack projects for your portfolio"
    ],
    salary: { min: 500000, max: 2200000, currency: "INR" },
  },
  {
    title: "Backend Software Engineer",
    description:
      "Architect microservices, database schemas, API authentication, and high-throughput server backends in Node.js, Java, Python, or Go.",
    category: "technology",
    branch: "Computer Science (CSE/IT)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Java", "Node.js", "Python", "PostgreSQL", "Redis", "Microservices", "System Design", "Docker"],
    roadmap: [
      "Master Data Structures, Algorithms, and Object-Oriented Programming",
      "Build robust RESTful & GraphQL backend APIs with Express or Spring Boot",
      "Learn Caching strategies (Redis) and Database Indexing/Optimization",
      "Master System Design principles: Load Balancing, Scalability, and Security",
      "Deploy microservices on AWS / GCP cloud platforms"
    ],
    salary: { min: 600000, max: 2400000, currency: "INR" },
  },
  {
    title: "Frontend Software Engineer",
    description:
      "Craft high-performance, accessible, and responsive user interfaces using modern Web APIs, React, Next.js, and state management.",
    category: "technology",
    branch: "Computer Science (CSE/IT)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Web Performance", "Jest", "Git"],
    roadmap: [
      "Master JavaScript ES6+, DOM manipulation, and CSS Grid/Flexbox",
      "Build single-page and server-side rendered applications in React / Next.js",
      "Implement State Management with Redux Toolkit or Zustand",
      "Optimize web performance metrics (Core Web Vitals) and Web Accessibility (a11y)",
      "Build responsive UI component libraries"
    ],
    salary: { min: 500000, max: 2000000, currency: "INR" },
  },
  {
    title: "Cloud Architect & DevOps Engineer",
    description:
      "Architect resilient cloud infrastructure, automate deployment pipelines, and maintain system availability across AWS, Azure, or GCP.",
    category: "technology",
    branch: "Computer Science (CSE/IT)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python", "Shell Scripting"],
    roadmap: [
      "Master Linux administration, networking fundamentals, and shell scripting",
      "Learn Containerization with Docker and Orchestration with Kubernetes",
      "Master Infrastructure as Code (IaC) using Terraform & Ansible",
      "Build automated CI/CD pipelines using GitHub Actions / Jenkins",
      "Earn AWS Certified Solutions Architect or CKA credential"
    ],
    salary: { min: 750000, max: 2800000, currency: "INR" },
  },
  {
    title: "Cybersecurity & Information Security Specialist",
    description:
      "Safeguard enterprise systems by conducting threat analysis, penetration testing, network monitoring, and security incident response.",
    category: "technology",
    branch: "Computer Science (CSE/IT)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Network Security", "Penetration Testing", "Python", "Linux", "SIEM", "Incident Response", "OWASP", "Wireshark"],
    roadmap: [
      "Understand TCP/IP, OSI Layers, Cryptography, and Operating System Security",
      "Master Linux command line, Wireshark, and Metasploit tools",
      "Practice hands-on penetration testing on HackTheBox and TryHackMe",
      "Learn SIEM log analysis, threat hunting, and Incident Response protocols",
      "Obtain industry certifications like CEH, CompTIA Security+, or OSCP"
    ],
    salary: { min: 600000, max: 2500000, currency: "INR" },
  },

  // --- AI & DATA SCIENCE BRANCH ---
  {
    title: "Machine Learning & AI Engineer",
    description:
      "Develop, train, and deploy intelligent algorithms and neural networks for computer vision, NLP, and predictive analytics.",
    category: "technology",
    branch: "AI & Data Science",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "SQL", "MLOps", "Deep Learning", "Docker"],
    roadmap: [
      "Master Python programming, Numpy, Pandas, and Linear Algebra",
      "Study core Machine Learning algorithms (Regression, Random Forest, SVM)",
      "Deep dive into Neural Networks & Deep Learning frameworks (PyTorch/TensorFlow)",
      "Work on Natural Language Processing (NLP) & Computer Vision models",
      "Learn MLOps, model deployment (FastAPI, Docker, MLflow), and monitoring",
      "Participate in Kaggle competitions and open-source AI projects"
    ],
    salary: { min: 800000, max: 3200000, currency: "INR" },
  },
  {
    title: "Data Scientist & Big Data Engineer",
    description:
      "Extract actionable business metrics and train predictive models from massive structured and unstructured datasets.",
    category: "analytical",
    branch: "AI & Data Science",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Python", "PySpark", "SQL", "Hadoop", "Data Pipelines", "Machine Learning", "Tableau", "Statistics"],
    roadmap: [
      "Master Advanced SQL, Python data libraries, and statistical modeling",
      "Learn Big Data distributed processing with Apache Spark & Hadoop",
      "Build scalable ETL data pipelines and database warehousing solutions",
      "Develop predictive statistical and machine learning models",
      "Create executive BI dashboards in Tableau, PowerBI, or Streamlit"
    ],
    salary: { min: 700000, max: 2800000, currency: "INR" },
  },

  // --- ECE BRANCH ---
  {
    title: "Embedded Systems & IoT Developer",
    description:
      "Design hardware-software integration for smart IoT devices, microcontrollers, real-time operating systems (RTOS), and wireless protocols.",
    category: "technology",
    branch: "Electronics & Communication (ECE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Embedded C", "C++", "Microcontrollers", "RTOS", "PCB Design", "IoT Protocols (MQTT)", "Raspberry Pi", "ARM"],
    roadmap: [
      "Master Embedded C/C++ and Microcontroller Architectures (STM32, ESP32, ARM)",
      "Learn hardware interfaces (SPI, I2C, UART, CAN bus)",
      "Study Real-Time Operating Systems (FreeRTOS) and peripheral programming",
      "Design schematic diagrams & multilayer PCBs using KiCAD / Altium",
      "Build wireless IoT systems using MQTT, Wi-Fi, and BLE protocols"
    ],
    salary: { min: 550000, max: 2400000, currency: "INR" },
  },
  {
    title: "VLSI & Microelectronics Chip Designer",
    description:
      "Architect, simulate, and verify integrated circuits (ICs), semiconductor chips, and System-on-Chips (SoCs) using Hardware Description Languages.",
    category: "technology",
    branch: "Electronics & Communication (ECE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Verilog", "VHDL", "SystemVerilog", "ASIC Design", "FPGA", "Cadence EDA", "CMOS", "Digital Logic"],
    roadmap: [
      "Master Digital Electronics, CMOS Logic, and Semiconductor Physics",
      "Learn Hardware Description Languages (Verilog / VHDL)",
      "Study RTL synthesis, timing closure, and FPGA prototyping (Xilinx)",
      "Master IC verification with SystemVerilog & UVM methodology",
      "Gain hands-on experience with Cadence / Synopsys EDA toolsuites"
    ],
    salary: { min: 700000, max: 3000000, currency: "INR" },
  },
  {
    title: "Robotics & Automation Engineer",
    description:
      "Build autonomous industrial and service robots integrating sensors, motor drivers, control systems, and computer vision algorithms.",
    category: "technology",
    branch: "Electronics & Communication (ECE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["ROS (Robot Operating System)", "C++", "Python", "Control Systems", "Computer Vision", "PLC", "Kinematics", "Sensors"],
    roadmap: [
      "Master C++ and Python fundamentals for robotics",
      "Study Robot Kinematics, Dynamics, and Feedback Control Loops",
      "Master Robot Operating System (ROS 2) and Gazebo simulations",
      "Integrate LiDAR, cameras, and IMU sensors for SLAM navigation",
      "Develop autonomous robot prototypes with obstacle avoidance"
    ],
    salary: { min: 600000, max: 2600000, currency: "INR" },
  },

  // --- EEE BRANCH ---
  {
    title: "Power Systems & High-Voltage Engineer",
    description:
      "Design, analyze, and manage electrical grids, substations, high-voltage equipment, and power distribution infrastructure.",
    category: "analytical",
    branch: "Electrical & Electronics (EEE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Power Electronics", "MATLAB / Simulink", "ETAP", "SCADA", "High Voltage", "Switchgear", "Grid Analysis"],
    roadmap: [
      "Master Three-Phase AC Circuit Theory, Transformers, and Electrical Machines",
      "Learn Power System Analysis and Simulation using ETAP & MATLAB Simulink",
      "Study Substation Automation, Protective Relaying, and Switchgear Design",
      "Learn SCADA systems and Industrial PLC programming for power plants",
      "Prepare for GATE EEE or industry certifications for utility corporations"
    ],
    salary: { min: 500000, max: 2200000, currency: "INR" },
  },
  {
    title: "Smart Grid & Renewable Energy Engineer",
    description:
      "Develop sustainable energy generation projects including solar microgrids, wind farms, energy storage batteries, and smart metering systems.",
    category: "technology",
    branch: "Electrical & Electronics (EEE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Solar PV Systems", "Energy Storage", "Smart Grids", "MATLAB", "Power Inverters", "BMS", "HOMER Energy"],
    roadmap: [
      "Understand Solar Photovoltaics, Wind Turbine Dynamics, and Energy Conversion",
      "Learn Battery Management Systems (BMS) for Lithium-ion & EV storage",
      "Design grid-tied & off-grid solar energy systems using PVsyst",
      "Master Smart Grid communication standards and microgrid control",
      "Deliver commercial renewable energy plant installation projects"
    ],
    salary: { min: 520000, max: 2300000, currency: "INR" },
  },

  // --- MECHANICAL BRANCH ---
  {
    title: "CAD/CAM Design & CAE Simulation Engineer",
    description:
      "Design mechanical assemblies, perform finite element stress analysis (FEA), and prepare computer-aided manufacturing workflows for industrial components.",
    category: "technology",
    branch: "Mechanical Engineering (ME)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["SolidWorks", "CATIA", "ANSYS", "Finite Element Analysis (FEA)", "GD&T", "AutoCAD", "CNC Machining"],
    roadmap: [
      "Master Engineering Drawing, Mechanics of Materials, and Geometric Dimensioning (GD&T)",
      "Build 3D parametric CAD models in SolidWorks or CATIA",
      "Perform Structural, Modal, and Thermal simulations in ANSYS / Abaqus",
      "Learn CAM programming for 3-axis / 5-axis CNC manufacturing",
      "Design mechanical prototype components adhering to ISO standards"
    ],
    salary: { min: 480000, max: 2000000, currency: "INR" },
  },
  {
    title: "Electric Vehicle (EV) & Automotive Systems Engineer",
    description:
      "Architect electric powertrains, battery thermal management systems, motor controllers, and autonomous drive systems for next-gen vehicles.",
    category: "technology",
    branch: "Mechanical Engineering (ME)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["EV Powertrain", "Battery Thermal Management", "MATLAB / Simulink", "CAN Bus", "Motors & Drives", "SolidWorks"],
    roadmap: [
      "Master Automotive Thermodynamics, Vehicle Dynamics, and Mechanics",
      "Study Electric Motor selection (PMSM, BLDC) and Power Inverter design",
      "Design Battery Packs and Thermal Management Systems (CFD analysis)",
      "Model complete EV drivetrain software in MATLAB / Simulink",
      "Gain practical internship experience with leading EV OEMs"
    ],
    salary: { min: 600000, max: 2600000, currency: "INR" },
  },

  // --- CIVIL BRANCH ---
  {
    title: "Structural & Infrastructure Engineer",
    description:
      "Plan, design, and supervise the construction of structural foundations, bridges, high-rise buildings, and public transportation infrastructure.",
    category: "analytical",
    branch: "Civil Engineering (CE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["STAAD Pro", "ETABS", "AutoCAD", "Reinforced Concrete", "Structural Analysis", "Geotechnical Engg", "BIM"],
    roadmap: [
      "Master Mechanics of Solids, Fluid Mechanics, and Soil Mechanics",
      "Learn structural calculations for Reinforced Concrete (RCC) & Steel structures",
      "Master Structural Analysis software like STAAD.Pro, ETABS, and SAP2000",
      "Study Geotechnical Engineering, Foundation Design, and Seismic retrofitting",
      "Supervise structural site construction following national IS Codes"
    ],
    salary: { min: 450000, max: 2100000, currency: "INR" },
  },
  {
    title: "Construction Project & BIM Manager",
    description:
      "Manage large-scale civil projects from architectural blueprints to building execution using 3D Building Information Modeling (BIM) and Primavera.",
    category: "business",
    branch: "Civil Engineering (CE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Revit BIM", "Primavera P6", "MS Project", "Cost Estimation", "Site Safety", "Contract Management", "AutoCAD"],
    roadmap: [
      "Master Architectural blueprints and Construction Material specifications",
      "Learn Building Information Modeling (BIM) with Autodesk Revit & Navisworks",
      "Master project scheduling & resource allocation using Primavera P6 / MS Project",
      "Understand Tender preparation, BOQ estimation, and Construction Contracts",
      "Lead multi-disciplinary site engineering teams to project completion"
    ],
    salary: { min: 550000, max: 2500000, currency: "INR" },
  },

  // --- CHEMICAL BRANCH ---
  {
    title: "Process Safety & Chemical Plant Engineer",
    description:
      "Optimize chemical manufacturing reactors, mass transfer units, heat exchangers, and safety protocols in pharmaceuticals, energy, and specialty materials.",
    category: "analytical",
    branch: "Chemical Engineering (ChE)",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Aspen Plus", "Chemical Reactor Design", "Mass Transfer", "Process Control", "HAZOP Analysis", "Fluid Dynamics"],
    roadmap: [
      "Master Chemical Thermodynamics, Fluid Flow, and Heat/Mass Transfer",
      "Simulate continuous chemical processes using Aspen Plus / HYSYS",
      "Design industrial Distillation Columns, Heat Exchangers, and Chemical Reactors",
      "Conduct Hazard and Operability (HAZOP) studies for safety compliance",
      "Manage chemical unit operations in pharmaceutical or manufacturing plants"
    ],
    salary: { min: 500000, max: 2200000, currency: "INR" },
  },

  // --- BIOTECHNOLOGY BRANCH ---
  {
    title: "Biotechnology & Bioprocess Engineer",
    description:
      "Design bioreactors, fermentation processes, cell culture systems, and biopharmaceutical purification pipelines for technical industry applications.",
    category: "analytical",
    branch: "Biotechnology & Biomedical",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Bioprocess Engineering", "Fermentation", "Cell Culture", "Downstream Processing", "Bio-reactors", "HPLC"],
    roadmap: [
      "Master Biochemical Engineering Principles and Kinetics",
      "Operate industrial Fermenters, Bioreactors, and Chromatography columns",
      "Learn Downstream Processing and Purification of biological products",
      "Ensure GMP compliance and bioprocess quality control",
      "Work in biopharmaceutical manufacturing, biofuels, or industrial biotech"
    ],
    salary: { min: 480000, max: 2100000, currency: "INR" },
  },
  {
    title: "Bioinformatics & Computational Biologist",
    description:
      "Use computational algorithms, Python/R programming, and machine learning to analyze genomic sequences and accelerate drug discovery.",
    category: "analytical",
    branch: "Biotechnology & Biomedical",
    educationLevel: "BTECH",
    careerType: "JOB_ROLE",
    skills: ["Python", "R", "Genomics", "BioPython", "BLAST", "Molecular Docking", "SQL", "Statistics"],
    roadmap: [
      "Master Molecular Biology fundamentals and Computer Science logic",
      "Learn Bioinformatics programming in Python (BioPython) and R (Bioconductor)",
      "Analyze Next-Generation Sequencing (NGS) data and gene expression",
      "Perform Molecular Docking and computer-aided drug design simulations",
      "Build pipelines for clinical research data analysis"
    ],
    salary: { min: 520000, max: 2300000, currency: "INR" },
  },
];

const demoAccounts = [
  {
    fullName: "10th Class Student",
    email: "tenth.demo@careerverse.com",
    password: "Demo@123",
    role: "student",
    educationLevel: "TENTH",
  },
  {
    fullName: "Intermediate Student",
    email: "inter.demo@careerverse.com",
    password: "Demo@123",
    role: "student",
    educationLevel: "INTERMEDIATE",
  },
  {
    fullName: "BTech Engineering Student",
    email: "btech.demo@careerverse.com",
    password: "Demo@123",
    role: "student",
    educationLevel: "BTECH",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Career.deleteMany({});
    console.log("Cleared existing careers");

    const inserted = await Career.insertMany(careers);
    console.log(`Successfully seeded ${inserted.length} careers across TENTH, INTERMEDIATE, and BTECH categories!`);

    // Seed/upsert demo accounts for all 3 categories
    console.log("\nSeeding Demo Accounts...");
    for (const demo of demoAccounts) {
      let user = await User.findOne({ email: demo.email });
      if (!user) {
        user = await User.create(demo);
        console.log(` - Created Demo Account: ${demo.email} [${demo.educationLevel}]`);
      } else {
        user.educationLevel = demo.educationLevel;
        user.fullName = demo.fullName;
        await user.save();
        console.log(` - Updated Demo Account: ${demo.email} [${demo.educationLevel}]`);
      }
    }

    console.log("\nSummary of Seeded Careers by Category:");
    const countByLevel = { TENTH: 0, INTERMEDIATE: 0, BTECH: 0 };
    inserted.forEach((c) => {
      countByLevel[c.educationLevel] = (countByLevel[c.educationLevel] || 0) + 1;
    });
    console.log(` - TENTH Streams & Courses: ${countByLevel.TENTH}`);
    console.log(` - INTERMEDIATE Degrees & Pathways: ${countByLevel.INTERMEDIATE}`);
    console.log(` - BTECH Job Roles: ${countByLevel.BTECH}`);
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

// Execute seed if run directly
if (require.main === module) {
  seed();
}

module.exports = { careers, seed };
