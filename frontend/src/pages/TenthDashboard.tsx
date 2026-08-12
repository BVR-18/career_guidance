import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/cards/DashboardCard";
import ProgressChart from "@/components/charts/ProgressChart";
import Skeleton from "@/components/common/Skeleton";
import ErrorState from "@/components/common/ErrorState";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import DashboardRoadmapWidget from "@/components/dashboard/DashboardRoadmapWidget";

const streamCards = [
  {
    title: "MPC",
    fullTitle: "Maths, Physics, Chemistry",
    tag: "Engineering & Tech",
    badgeColor: "bg-blue-500/10 text-blue-600",
    description: "Best for students who love mathematics, physics, problem solving, and technology.",
    futurePaths: "BTech Engineering, Computer Science, Architecture, Defense (NDA), Physical Sciences.",
  },
  {
    title: "BiPC",
    fullTitle: "Biology, Physics, Chemistry",
    tag: "Medicine & Health",
    badgeColor: "bg-emerald-500/10 text-emerald-600",
    description: "Best for students interested in human biology, healthcare, pharmacy, and life sciences.",
    futurePaths: "MBBS Medicine, Pharmacy (B.Pharm), Biotechnology, Nursing, Agriculture, Paramedical.",
  },
  {
    title: "MEC",
    fullTitle: "Maths, Economics, Commerce",
    tag: "Finance & Business",
    badgeColor: "bg-amber-500/10 text-amber-600",
    description: "Best for students with analytical skills interested in business, trade, and financial markets.",
    futurePaths: "Chartered Accountancy (CA), BCom, BBA, Business Analytics, Banking, Finance.",
  },
  {
    title: "CEC",
    fullTitle: "Civics, Economics, Commerce",
    tag: "Law & Governance",
    badgeColor: "bg-purple-500/10 text-purple-600",
    description: "Best for students interested in law, economics, civics, governance, and public administration.",
    futurePaths: "Integrated Law (BA LLB), Civil Services (UPSC), Public Policy, Management.",
  },
];

const vocationalOptions = [
  {
    title: "Polytechnic Diploma (3 Years)",
    icon: "precision_manufacturing",
    description:
      "Hands-on engineering diploma in CSE, ECE, Mechanical, Civil. Allows lateral entry directly into 2nd year BTech via ECET in Andhra Pradesh!",
  },
  {
    title: "ITI (Industrial Training Institutes)",
    icon: "build",
    description:
      "Short 1-2 year technical trade training in Electrical, Fitter, Mechanic, Machinist for immediate practical career opportunities.",
  },
  {
    title: "Skill & Vocational Courses",
    icon: "school",
    description:
      "Specialized job-oriented certificates in Computer Applications, Multimedia, Design, and Applied Skills.",
  },
];

export default function TenthDashboard() {
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
              10th Class Student Guidance
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              Andhra Pradesh & National Context
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
            Welcome, {user?.fullName?.split(" ")[0] ?? "Student"}!
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Discover what stream to choose after 10th — compare MPC, BiPC, MEC, CEC, Polytechnic, and vocational paths tailored for your future.
          </p>
        </div>

        <Link
          to="/assessment"
          className="shrink-0 bg-primary text-on-primary font-label-md text-label-md px-6 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">quiz</span>
          Start 10th Assessment
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon="school" label="Education Level" value="10th Class" accent="primary" />
        <DashboardCard icon="quiz" label="Assessments Taken" value={data?.stats.assessmentsTaken ?? 0} accent="secondary" />
        <DashboardCard icon="explore" label="Streams Explored" value="6 Paths" accent="tertiary" />
        <DashboardCard icon="map" label="Roadmap Progress" value={`${data?.stats.roadmapProgress ?? 0}%`} accent="primary" />
      </div>

      {/* Synchronized Roadmap Card */}
      <DashboardRoadmapWidget
        roadmap={data?.roadmap}
        fallbackEducationLevel="TENTH"
        fallbackProgress={data?.stats.roadmapProgress}
      />

      {/* Recommended Stream Card (If Assessment Completed) */}
      {latestResult && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm border-2 border-primary/20 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider block mb-1">
                Your Assessment Recommendation
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                {latestResult.primaryRecommendation || "Recommended Post-10th Stream"}
              </h2>
            </div>
            <Link
              to="/assessment/result"
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              View Detailed Analysis <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <strong>Why recommended?</strong> {latestResult.explanation || "Based on your strong interest scores in Mathematics, Physics, and Technical Problem Solving."}
          </p>
        </div>
      )}

      {/* Section 1: What Should I Choose After 10th? */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1">
              What Should I Choose After 10th?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Explore standard Intermediate 2-year subject combinations in Andhra Pradesh.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {streamCards.map((stream) => (
            <div key={stream.title} className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-[16px] font-bold">
                      {stream.title}
                    </span>
                    {stream.fullTitle}
                  </h3>
                  <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold ${stream.badgeColor}`}>
                    {stream.tag}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  {stream.description}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
                  Future Career Pathways:
                </span>
                <p className="font-body-sm text-body-sm text-primary font-medium">
                  {stream.futurePaths}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Vocational & Diploma Alternatives */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          Polytechnic & Technical Diploma Paths
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6">
          If you prefer practical hands-on engineering trades rather than general Intermediate studies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vocationalOptions.map((opt) => (
            <div key={opt.title} className="p-5 rounded-xl bg-surface-container-high/50 border border-outline-variant/30 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">{opt.icon}</span>
              </div>
              <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">{opt.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{opt.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Next Steps & AI Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">10th Career Assessment</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Take our interactive 10-question quiz to analyze your interest scores and get personalized stream recommendations.
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
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Stream Comparison</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Compare MPC vs BiPC, MPC vs MEC, or Intermediate vs Polytechnic side-by-side.
            </p>
          </div>
          <Link to="/compare" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            Compare Streams <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">AI Career Advisor</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Ask AI about colleges in Andhra Pradesh, stream syllabus, or future job prospects.
            </p>
          </div>
          <Link to="/chat" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
            Chat with AI <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
