import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: "quiz",
    accent: "primary" as const,
    title: "Career Assessment",
    description: "Answer a short, thoughtful quiz and get scored recommendations across categories built for you.",
    cta: "Take the Assessment",
    to: "/register",
  },
  {
    icon: "account_tree",
    accent: "secondary" as const,
    title: "Guided Roadmaps",
    description: "Every career comes with a visual, step-by-step roadmap — skills, milestones, and resources in order.",
    cta: "Browse Roadmaps",
    to: "/careers",
  },
  {
    icon: "forum",
    accent: "tertiary" as const,
    title: "AI Career Chat",
    description: "Ask anything about a path, compare tradeoffs, or get interview prep, powered by Gemini AI.",
    cta: "Talk to the AI",
    to: "/register",
  },
];

const accentClasses = {
  primary: { icon: "bg-primary-container text-on-primary-container group-hover:bg-primary group-hover:text-on-primary", text: "text-primary", blob: "bg-primary/5" },
  secondary: { icon: "bg-secondary-container text-on-secondary-container group-hover:bg-secondary group-hover:text-on-secondary", text: "text-secondary", blob: "bg-secondary/5", border: "border-t-secondary" },
  tertiary: { icon: "bg-tertiary-container text-on-tertiary-container group-hover:bg-tertiary group-hover:text-on-tertiary", text: "text-tertiary", blob: "bg-tertiary/5" },
};

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleExplore = () => {
    navigate(query.trim() ? `/careers?search=${encodeURIComponent(query.trim())}` : "/careers");
  };

  return (
    <>
      {/* Hero */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-24 md:py-32 max-w-container-max mx-auto text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/20 text-secondary mb-8 border border-secondary-container/30"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span className="font-label-sm text-label-sm">AI-Powered Career Guidance</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-headline-lg-mobile md:font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface max-w-3xl mb-6"
        >
          Your Future, <span className="text-primary relative inline-block">Mapped Out.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mb-12"
        >
          Take an AI-scored assessment, explore hundreds of careers, and follow a personalized roadmap — with an
          AI guide on call whenever you need direction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-xl mx-auto relative glass-panel rounded-full p-2 shadow-lg flex items-center transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/20"
        >
          <span className="material-symbols-outlined text-outline ml-4">search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleExplore()}
            className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface px-4 py-3 placeholder-outline-variant outline-none"
            placeholder="Find your path (e.g. Data Scientist, UX Designer)..."
            type="text"
          />
          <button
            onClick={handleExplore}
            className="bg-primary text-on-primary rounded-full px-8 py-3 font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors min-h-[48px]"
          >
            Explore
          </button>
        </motion.div>

        <div className="mt-16 flex flex-wrap justify-center gap-6 opacity-70">
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Trusted by 10,000+ users
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Gemini AI Insights
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span> Free to Start
          </span>
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-unit-xl max-w-container-max mx-auto relative z-20">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Everything You Need, One Platform</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            From your first assessment to your first job offer, CareerVerse keeps every step organized and personal.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => {
            const a = accentClasses[f.accent];
            return (
              <div
                key={f.title}
                onClick={() => navigate(f.to)}
                className={`glass-panel rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 cursor-pointer group shadow-sm hover:shadow-md relative overflow-hidden flex flex-col h-full ${
                  "border" in a ? `border-t-4 ${a.border}` : ""
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 ${a.blob}`} />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${a.icon}`}>
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 relative z-10">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow relative z-10">
                  {f.description}
                </p>
                <div className={`flex items-center font-label-md text-label-md mt-auto relative z-10 ${a.text}`}>
                  {f.cta}
                  <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why choose */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-unit-xl md:py-24 max-w-container-max mx-auto bg-surface-container-low rounded-[40px] my-unit-xl relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="w-full md:w-1/2">
            <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface mb-6">
              Why Choose CareerVerse?
            </h2>
            <p className="font-body-md md:font-body-lg text-body-md md:text-body-lg text-on-surface-variant mb-10">
              We don't hand you a list of job titles — we give you a scored, structured framework and an AI guide
              that actually knows the roadmap you're on.
            </p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">insights</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Data-Backed Matching</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Your assessment scores drive real recommendations, not a generic quiz result.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">route</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Step-by-Step Roadmaps</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Visual timelines that track what you've completed and what's next.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Always-On AI Guidance</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Ask follow-up questions any time — no waiting for office hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 auto-rows-[160px]">
              <div className="col-span-2 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-end p-6 shadow-md">
                <p className="font-headline-md text-headline-md text-on-primary">Plan → Learn → Land the Role</p>
              </div>
              <div className="rounded-2xl bg-secondary-container p-6 flex flex-col justify-between shadow-md">
                <span className="material-symbols-outlined text-4xl text-on-secondary-container">groups</span>
                <p className="font-label-sm text-label-sm text-on-secondary-container">10,000+ learners guided</p>
              </div>
              <div className="rounded-2xl bg-primary-container p-6 flex flex-col justify-between shadow-md">
                <span className="material-symbols-outlined text-4xl text-on-primary-container">moving</span>
                <div>
                  <p className="font-headline-md text-headline-md text-on-primary-container">85%</p>
                  <p className="font-label-sm text-label-sm text-on-primary-container/80">Goal Achievement Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
