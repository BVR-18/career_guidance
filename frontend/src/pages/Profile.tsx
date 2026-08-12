import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import CareerCard from "@/components/cards/CareerCard";
import EmptyState from "@/components/common/EmptyState";
import Loader from "@/components/common/Loader";

export default function Profile() {
  const { user, logout } = useAuth();
  const { data, isLoading, refresh, toggleSaveCareer } = useDashboard();

  useEffect(() => {
    if (!data) refresh();
  }, [data, refresh]);

  if (!user || (isLoading && !data)) return <Loader fullScreen label="Loading your profile..." />;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="glass-panel rounded-2xl p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-lg text-headline-lg shrink-0">
          {user.fullName[0]?.toUpperCase()}
        </div>
        <div className="flex-grow text-center sm:text-left">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">{user.fullName}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-1">{user.email}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm capitalize">
            {user.role}
          </span>
        </div>
        <button
          onClick={logout}
          className="border border-error text-error font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-error/5 transition-colors flex items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>

      {data?.latestAssessment && (
        <div className="glass-panel rounded-2xl p-8 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Assessment Summary</h2>
          <div className="flex flex-wrap gap-2">
            {data.latestAssessment.topCategories.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Saved Careers</h2>
        {data?.savedCareers.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.savedCareers.map((c) => (
              <CareerCard key={c.id} career={c} isSaved onToggleSave={() => toggleSaveCareer(c.id, true)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="bookmark_border"
            title="No saved careers yet"
            description="Save careers you're interested in to find them here."
            action={{ label: "Explore Careers", onClick: () => (window.location.href = "/careers") }}
          />
        )}
      </div>
    </div>
  );
}
