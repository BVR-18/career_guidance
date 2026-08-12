import { Link } from "react-router-dom";
import type { DashboardRoadmapInfo, EducationLevel } from "@/types";

interface DashboardRoadmapWidgetProps {
  roadmap?: DashboardRoadmapInfo | null;
  fallbackEducationLevel?: EducationLevel;
  fallbackProgress?: number;
}

export default function DashboardRoadmapWidget({
  roadmap,
  fallbackEducationLevel = "BTECH",
  fallbackProgress = 0,
}: DashboardRoadmapWidgetProps) {
  const activeCareerTitle = roadmap?.activeCareer?.title || "Career Pathway Roadmap";
  const level = roadmap?.activeCareer?.educationLevel || fallbackEducationLevel;
  const progress = roadmap?.roadmapProgress ?? fallbackProgress;
  const completedCount = roadmap?.completedPhasesCount ?? 0;
  const totalCount = roadmap?.totalPhasesCount ?? 5;
  const currentPhase = roadmap?.currentPhase;
  const nextAction = roadmap?.nextAction || "Complete Phase 1 to unlock your career pathway.";

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm border border-outline-variant/20 flex flex-col justify-between gap-6 relative overflow-hidden bg-gradient-to-br from-surface to-surface-container-lowest">
      {/* Header Info */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">map</span>
            </span>
            <span className="font-label-md text-label-md font-bold text-on-surface-variant uppercase tracking-wider">
              Roadmap Single Source of Truth
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
            {level} Level
          </span>
        </div>

        <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-1">
          {activeCareerTitle}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
          Strict sequential phase tracking for your authenticated career goal.
        </p>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Overall Progress</span>
          <span className="font-headline-sm text-headline-sm text-primary font-bold">{progress}%</span>
        </div>

        <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stat badges */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
            <span className="font-label-sm text-[11px] text-on-surface-variant block uppercase tracking-wider">
              Current Active Phase
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold truncate block">
              {currentPhase ? `Phase ${currentPhase.order}: ${currentPhase.title}` : roadmap?.isCompleted ? "Roadmap Complete 🎉" : "Phase 1"}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-high/40 border border-outline-variant/20">
            <span className="font-label-sm text-[11px] text-on-surface-variant block uppercase tracking-wider">
              Phases Completed
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold block">
              {completedCount} of {totalCount} Phases
            </span>
          </div>
        </div>

        {/* Next Action banner */}
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">info</span>
          <p className="font-body-sm text-body-sm text-on-surface font-medium">
            {nextAction}
          </p>
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Synchronized across Dashboard & Roadmap page
        </span>
        <Link
          to="/roadmap"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary/90 transition-all shadow-sm shrink-0"
        >
          <span>Continue Roadmap</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
