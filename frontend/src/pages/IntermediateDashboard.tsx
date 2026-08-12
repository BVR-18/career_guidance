import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/cards/DashboardCard";
import Skeleton from "@/components/common/Skeleton";
import ErrorState from "@/components/common/ErrorState";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import DashboardRoadmapWidget from "@/components/dashboard/DashboardRoadmapWidget";

const btechBranches = [
  { name: "Computer Science Engineering (CSE)", desc: "Software, Web Dev, Mobile Apps, Operating Systems, Cloud." },
  { name: "Artificial Intelligence & Data Science", desc: "Machine Learning, Neural Networks, Python, Big Data Analytics." },
  { name: "Electronics & Communication (ECE)", desc: "Embedded IoT, Microcontrollers, VLSI Chip Design, Telecom." },
  { name: "Electrical & Electronics (EEE)", desc: "Power Systems, Smart Grids, Renewable Energy, Electric Vehicles." },
  { name: "Mechanical Engineering (ME)", desc: "CAD/CAM Modeling, Robotics, Automotive Powertrains, Thermal." },
  { name: "Civil Engineering (CE)", desc: "Structural Infrastructure, Bridges, BIM Construction Management." },
  { name: "Biotechnology & Biomedical", desc: "Medical Devices, Bioinformatics, Genomics, Bioprocess Engg." },
];

const degreeOptions = [
  { title: "BCA (Bachelor of Computer Applications)", desc: "3-year practical tech degree focused on software programming, web development, and database management." },
  { title: "BSc Computer Science / Data Science", desc: "3-year science degree with mathematics, statistics, computer science, and data analytics." },
  { title: "BCom & BBA (Commerce / Management)", desc: "3-year business degree for finance, marketing, accounting, entrepreneurship, and corporate management." },
  { title: "BA (Humanities & Social Sciences)", desc: "3-year degree in Economics, Political Science, English, or History — ideal for Civil Services (UPSC/APPSC)." },
];

const professionalPaths = [
  { title: "Chartered Accountancy (CA) / CMA / CS", badge: "Finance & Corporate Law", desc: "Prestigious professional certifications for auditing, tax consultancy, financial reporting, and corporate governance." },
  { title: "Integrated Law (BA LLB / BBA LLB)", badge: "Legal Profession", desc: "5-year integrated law degree for practicing in High Courts/Supreme Court, corporate law firms, or judicial services." },
  { title: "Pharmacy (B.Pharm) & Nursing", badge: "Healthcare & Pharma", desc: "4-year professional healthcare programs in pharmaceutical manufacturing, clinical research, and hospital care." },
  { title: "Agriculture & Allied Sciences", badge: "Agri Tech", desc: "4-year degree in Agricultural Sciences, Soil Management, and Sustainable Farming." },
];

const govtPathways = [
  { title: "Defence Services (NDA / CDS)", desc: "Join Indian Army, Navy, or Air Force directly after 12th / Degree via UPSC NDA entrance." },
  { title: "Civil Services (UPSC / APPSC)", desc: "IAS, IPS, Group 1/2 State Officers — eligible after completing any 3-year or 4-year degree." },
  { title: "Banking & Financial Exams", desc: "IBPS PO/Clerk, SBI Officer recruitment exams after graduation." },
];

export default function IntermediateDashboard() {
  const { user } = useAuth();
  const { data, isLoading, error, refresh } = useDashboard();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading && !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (error) return <ErrorState onRetry={refresh} />;

  const latestResult = data?.latestAssessment;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-primary/10 via-surface to-surface">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold">
              Intermediate Student Guidance
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              AP EAPCET / JEE / Degree / CA / Law Pathways
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Welcome, {user?.fullName?.split(" ")[0] ?? "Student"}!
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Explore what to do after Intermediate — learn about BTech engineering branches, 3-year degrees, CA, Law, and government career pathways.
          </p>
        </div>

        <Link
          to="/assessment"
          className="shrink-0 bg-primary text-on-primary font-label-md text-label-md px-6 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          Start Intermediate Assessment
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon="school" label="Education Level" value="Intermediate" accent="primary" />
        <DashboardCard icon="quiz" label="Assessments Taken" value={data?.stats.assessmentsTaken ?? 0} accent="secondary" />
        <DashboardCard icon="explore" label="Career Options" value="15+ Paths" accent="tertiary" />
        <DashboardCard icon="map" label="Roadmap Progress" value={`${data?.stats.roadmapProgress ?? 0}%`} accent="primary" />
      </div>

      {/* Synchronized Roadmap Card */}
      <DashboardRoadmapWidget
        roadmap={data?.roadmap}
        fallbackEducationLevel="INTERMEDIATE"
        fallbackProgress={data?.stats.roadmapProgress}
      />

      {/* Recommended Pathway Card (If Assessment Completed) */}
      {latestResult && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm border-2 border-primary/20 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Your Assessment Recommendation
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                {latestResult.primaryRecommendation || "Recommended Pathway"}
              </h2>
            </div>
            <Link
              to="/assessment/result"
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              View Full Result <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <strong>Why recommended?</strong> {latestResult.explanation || "Based on your subject interests, career goals, and academic preferences."}
          </p>
        </div>
      )}

      {/* Section 1: What is BTech? */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[24px]">engineering</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">What is BTech?</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Bachelor of Technology (BTech) is a 4-year undergraduate professional engineering degree.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/30">
            <h3 className="font-label-md text-label-md text-primary font-bold mb-1">Duration & Eligibility</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              4 Years (8 Semesters). Requires Intermediate (MPC) with Physics, Chemistry, and Mathematics.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/30">
            <h3 className="font-label-md text-label-md text-primary font-bold mb-1">Admission Entrance Exams</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Admissions in Andhra Pradesh are based on <strong>AP EAPCET (EAMCET)</strong> ranks and national <strong>JEE Main</strong> scores.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container-high/50 border border-outline-variant/30">
            <h3 className="font-label-md text-label-md text-primary font-bold mb-1">Branch Choice Advice</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Select an engineering branch based on your genuine interest in coding, electronics, or machinery — not just salary hype alone.
            </p>
          </div>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 font-bold">Major BTech Engineering Branches</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {btechBranches.map((b) => (
            <div key={b.name} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest">
              <h4 className="font-label-md text-label-md text-on-surface font-bold mb-1">{b.name}</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Non-BTech Degree Options */}
      <div>
        <div className="mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
            Non-BTech Options After Intermediate
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            BTech is not the only great path. Explore 3-year degree courses, professional certifications, and law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {degreeOptions.map((d) => (
            <div key={d.title} className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-2">{d.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Professional & Government Pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Professional & Healthcare Paths</h2>
          {professionalPaths.map((p) => (
            <div key={p.title} className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/30">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-label-md text-label-md text-on-surface font-bold">{p.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px]">
                  {p.badge}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Government & Competitive Careers</h2>
          {govtPathways.map((g) => (
            <div key={g.title} className="p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/30">
              <h3 className="font-label-md text-label-md text-on-surface font-bold mb-1">{g.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Intermediate Assessment</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Take the assessment to discover whether BTech, BCA, BSc, CA, or Law suits your academic goals best.
            </p>
          </div>
          <Link to="/assessment" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            Start Assessment <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">compare_arrows</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Career Comparison</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Compare BTech CSE vs BCA, BTech vs BSc, or BTech vs Professional Degrees.
            </p>
          </div>
          <Link to="/compare" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            Compare Careers <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">AI Career Advisor</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Ask AI questions about AP EAPCET counseling, engineering branches, degree options, or entrance exams.
            </p>
          </div>
          <Link to="/chat" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            Ask AI Advisor <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
