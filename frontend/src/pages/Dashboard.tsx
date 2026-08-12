import { useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/cards/DashboardCard";
import CareerCard from "@/components/cards/CareerCard";
import ProgressChart from "@/components/charts/ProgressChart";
import Skeleton from "@/components/common/Skeleton";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import { formatDate } from "@/utils/formatters";
import TenthDashboard from "./TenthDashboard";
import IntermediateDashboard from "./IntermediateDashboard";
import DashboardRoadmapWidget from "@/components/dashboard/DashboardRoadmapWidget";

const activityIcon: Record<string, string> = {
  assessment: "quiz",
  career_saved: "bookmark",
  roadmap_step: "check_circle",
  chat: "forum",
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading, error, refresh, toggleSaveCareer } = useDashboard();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (user?.educationLevel === "TENTH") {
    return <TenthDashboard />;
  }

  if (user?.educationLevel === "INTERMEDIATE") {
    return <IntermediateDashboard />;
  }

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

  const savedIds = new Set(data?.savedCareers.map((c) => c.id));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">
          Welcome back, {user?.fullName?.split(" ")[0] ?? "there"}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Here's where your career journey stands today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard icon="quiz" label="Assessments Taken" value={data?.stats.assessmentsTaken ?? 0} accent="primary" />
        <DashboardCard icon="bookmark" label="Saved Careers" value={data?.stats.savedCareersCount ?? 0} accent="secondary" />
        <DashboardCard icon="forum" label="Chat Sessions" value={data?.stats.chatSessions ?? 0} accent="tertiary" />
        <DashboardCard icon="map" label="Roadmap Progress" value={`${data?.stats.roadmapProgress ?? 0}%`} accent="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">Recommended For You</h2>
              <Link to="/careers" className="font-label-sm text-label-sm text-primary hover:underline">
                See all
              </Link>
            </div>
            {data?.recommendedCareers.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.recommendedCareers.slice(0, 4).map((c) => (
                  <CareerCard
                    key={c.id}
                    career={c}
                    isSaved={savedIds.has(c.id)}
                    onToggleSave={() => toggleSaveCareer(c.id, savedIds.has(c.id))}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="quiz"
                title="Take the assessment"
                description="Complete your career assessment to get personalized recommendations."
                action={{ label: "Start Assessment", onClick: () => (window.location.href = "/assessment") }}
              />
            )}
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Recent Activity</h2>
            {data?.recentActivity.length ? (
              <div className="flex flex-col divide-y divide-outline-variant/20">
                {data.recentActivity.map((a) => (
                  <div key={a.id} className="flex items-center gap-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{activityIcon[a.type] ?? "circle"}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-body-md text-body-md text-on-surface">{a.description}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{formatDate(a.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon="history" title="No activity yet" description="Your recent actions will show up here." />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <DashboardRoadmapWidget
            roadmap={data?.roadmap}
            fallbackEducationLevel={user?.educationLevel}
            fallbackProgress={data?.stats.roadmapProgress}
          />

          {data?.latestAssessment && (
            <div className="glass-panel rounded-2xl p-8 shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Latest Assessment</h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-3">
                Completed {formatDate(data.latestAssessment.completedAt)}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {data.latestAssessment.topCategories.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm">
                    {c}
                  </span>
                ))}
              </div>
              <Link to="/assessment/result" className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1">
                View Full Result <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
