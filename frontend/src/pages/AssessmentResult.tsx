import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CareerCard from "@/components/cards/CareerCard";
import BarChart from "@/components/charts/BarChart";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import { assessmentService } from "@/services/assessmentService";
import { useDashboard } from "@/context/DashboardContext";
import type { AssessmentResult as AssessmentResultType } from "@/types";

export default function AssessmentResult() {
  const navigate = useNavigate();
  const { data: dashboard, toggleSaveCareer } = useDashboard();
  const [result, setResult] = useState<AssessmentResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const savedIds = new Set(dashboard?.savedCareers.map((c) => c.id));

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await assessmentService.getResult();
        setResult(res.data ?? null);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, []);

  if (isLoading) return <Loader fullScreen label="Scoring your results..." />;
  if (error || !result) return <ErrorState description="We couldn't load your assessment result." />;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Your Personalized Assessment Result</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Based on your answers, here is your primary stream/pathway recommendation and analysis.
        </p>
      </div>

      {/* Primary Recommendation Card with WHY Explanation */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm border-2 border-primary/30 bg-primary/5">
        <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold inline-block mb-3">
          Primary Recommendation
        </span>
        <h2 className="font-headline-xl text-headline-lg font-bold text-on-surface mb-3">
          {result.primaryRecommendation || result.topCategories[0]}
        </h2>
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 mb-6">
          <h3 className="font-label-md text-label-md text-primary font-bold mb-2">Why was this path recommended for you?</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {result.explanation || "Your assessment answers demonstrated strong affinity and aptitude in this direction."}
          </p>
        </div>

        {result.alternativeOptions && result.alternativeOptions.length > 0 && (
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-2 font-semibold">
              Other Suitable Alternatives:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.alternativeOptions.map((opt) => (
                <span key={opt} className="px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  {opt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Category Interest Scores</h2>
          <BarChart
            labels={result.scores.map((s) => s.category.toUpperCase())}
            values={result.scores.map((s) => s.score)}
            label="Score"
          />
        </div>

        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Top Focus Areas</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {result.topCategories.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full bg-tertiary/10 text-tertiary font-label-md text-label-md font-bold">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-6 border-t border-outline-variant/20">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              Return to Dashboard
            </Link>
            <Link
              to="/roadmap"
              className="px-6 py-3 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">map</span>
              View Roadmap
            </Link>
            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-3 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
              Ask AI Advisor
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Recommended Career & Academic Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.recommendedCareers.map((c) => (
            <CareerCard
              key={c.id}
              career={c}
              isSaved={savedIds.has(c.id)}
              onToggleSave={() => toggleSaveCareer(c.id, savedIds.has(c.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
