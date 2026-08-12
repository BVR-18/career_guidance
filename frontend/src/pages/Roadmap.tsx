import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import RoadmapStepItem from "@/components/cards/RoadmapStep";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import { roadmapService } from "@/services/roadmapService";
import { careerService } from "@/services/careerService";
import { useDashboard } from "@/context/DashboardContext";
import { useAuth } from "@/context/AuthContext";
import type { Roadmap as RoadmapType, Career, EducationLevel, RoadmapPhase } from "@/types";

const ACTIVE_CAREER_KEY = "careerverse_active_career_id";

export default function Roadmap() {
  const { careerId: urlCareerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const { refresh } = useDashboard();
  const { user, isAuthenticated } = useAuth();
  const level: EducationLevel = user?.educationLevel || "BTECH";

  const [allCareers, setAllCareers] = useState<Career[]>([]);
  const [selectedCareerId, setSelectedCareerId] = useState<string>("");
  const [roadmap, setRoadmap] = useState<RoadmapType | null>(null);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);

  // 1. Fetch available careers strictly for user's educationLevel
  useEffect(() => {
    careerService
      .getAll({ educationLevel: level })
      .then((res) => {
        if (res.data) setAllCareers(res.data);
      })
      .catch(() => {});
  }, [level]);

  // 2. Reset career selection if user changes
  useEffect(() => {
    if (urlCareerId) {
      setSelectedCareerId(urlCareerId);
      localStorage.setItem(`${ACTIVE_CAREER_KEY}_${user?.id || 'guest'}`, urlCareerId);
    } else {
      const stored = localStorage.getItem(`${ACTIVE_CAREER_KEY}_${user?.id || 'guest'}`);
      if (stored) {
        setSelectedCareerId(stored);
      } else if (allCareers.length > 0) {
        setSelectedCareerId(allCareers[0].id);
      } else {
        setIsLoading(false);
      }
    }
  }, [urlCareerId, allCareers, user?.id]);

  // 3. Fetch roadmap and progress whenever selectedCareerId changes
  useEffect(() => {
    if (!selectedCareerId) return;

    const fetchRoadmapAndProgress = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const roadmapRes = await roadmapService.getForCareer(selectedCareerId);
        if (roadmapRes.data) {
          setRoadmap(roadmapRes.data);
          setCompletedStepIds(roadmapRes.data.completedStepIds || []);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapAndProgress();
  }, [selectedCareerId, isAuthenticated]);

  const handleSelectCareer = (id: string) => {
    setSelectedCareerId(id);
    localStorage.setItem(`${ACTIVE_CAREER_KEY}_${user?.id || 'guest'}`, id);
    navigate(`/roadmap/${id}`);
  };

  // Phase Completion Handler
  const handleCompletePhase = async (phase: RoadmapPhase) => {
    if (!selectedCareerId || !roadmap) return;

    if (!isAuthenticated) {
      toast("Please sign in to save your roadmap progress", { icon: "🔒" });
      return;
    }

    if (phase.status === "LOCKED") {
      toast.error(`Complete Phase ${phase.order - 1} first to unlock this phase!`);
      return;
    }

    const taskIds = phase.tasks.map((t) => t.id);
    const newStepIds = Array.from(new Set([...completedStepIds, phase.id, ...taskIds]));

    setIsSaving(true);
    try {
      const res = await roadmapService.saveProgress(selectedCareerId, newStepIds);
      if (res.data) {
        setRoadmap(res.data);
        setCompletedStepIds(res.data.completedStepIds || newStepIds);
        toast.success(`Phase ${phase.order} completed! Progress updated to ${res.data.progress}%.`);
        await refresh();
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to complete phase. Please ensure prior phases are finished.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Reopen Phase Handler (Mark Phase as Incomplete)
  const handleReopenPhase = async (phase: RoadmapPhase) => {
    if (!selectedCareerId || !roadmap) return;

    if (!isAuthenticated) {
      toast("Please sign in to update your progress", { icon: "🔒" });
      return;
    }

    setIsSaving(true);
    try {
      const res = await roadmapService.reopenPhase(selectedCareerId, phase.id);
      if (res.data) {
        setRoadmap(res.data);
        setCompletedStepIds(res.data.completedStepIds || []);
        toast.success(`Phase ${phase.order} marked as incomplete. Later phases locked.`);
        await refresh();
      }
    } catch {
      toast.error("Failed to reopen phase.");
    } finally {
      setIsSaving(false);
    }
  };

  // Task Toggle Handler
  const handleToggleTask = async (phase: RoadmapPhase, taskId: string) => {
    if (!selectedCareerId || !roadmap || phase.status === "LOCKED") return;

    if (!isAuthenticated) {
      toast("Please sign in to save your progress", { icon: "🔒" });
      return;
    }

    const isCurrentlyCompleted = completedStepIds.includes(taskId);
    let updatedTaskIds = isCurrentlyCompleted
      ? completedStepIds.filter((id) => id !== taskId)
      : [...completedStepIds, taskId];

    const allTasksCompleted = phase.tasks.every(
      (t) => t.id === taskId ? !isCurrentlyCompleted : updatedTaskIds.includes(t.id)
    );

    if (allTasksCompleted && !updatedTaskIds.includes(phase.id)) {
      updatedTaskIds.push(phase.id);
    }

    setCompletedStepIds(updatedTaskIds);

    setIsSaving(true);
    try {
      const res = await roadmapService.saveProgress(selectedCareerId, updatedTaskIds);
      if (res.data) {
        setRoadmap(res.data);
        setCompletedStepIds(res.data.completedStepIds || updatedTaskIds);
        await refresh();
      }
    } catch {
      toast.error("Failed to update task progress.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!selectedCareerId && !isLoading) {
    return (
      <EmptyState
        icon="map"
        title="No roadmap selected"
        description="Pick a career to generate its step-by-step roadmap."
        action={{ label: "Browse Careers", onClick: () => navigate("/careers") }}
      />
    );
  }

  const phases = roadmap?.phases || [];
  const progress = roadmap?.progress ?? 0;
  const completedPhasesCount = roadmap?.completedPhasesCount ?? 0;
  const totalPhasesCount = roadmap?.totalPhasesCount ?? phases.length;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Header & Career Switcher Dropdown */}
      <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
              {level} Education Level
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
              Strict Sequential Progression
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">
            {roadmap?.careerTitle ?? "Career"} Roadmap
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            All phases remain visible in order. Complete current phase to unlock the next, or reopen completed phases anytime.
          </p>
        </div>

        {allCareers.length > 0 && (
          <div className="shrink-0 min-w-[220px]">
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1 font-semibold">
              Select Career Goal
            </label>
            <select
              value={selectedCareerId}
              onChange={(e) => handleSelectCareer(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none font-label-md text-label-md"
            >
              {allCareers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isLoading && <Loader label="Building your personalized roadmap..." />}

      {!isLoading && error && (
        <ErrorState
          description="We couldn't load this roadmap."
          onRetry={() => setSelectedCareerId((id) => id)}
        />
      )}

      {!isLoading && !error && roadmap && (
        <>
          {/* Progress Bar & Status Summary Bar */}
          <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block font-bold">
                  Overall Roadmap Progress
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {completedPhasesCount} of {totalPhasesCount} Total Phases Completed
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {progress}%
                </span>
              </div>
            </div>

            <div className="w-full h-3.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Next Action Notification Banner */}
            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
              <div className="flex-grow">
                <p className="font-body-sm text-body-sm text-on-surface font-semibold">
                  {roadmap.nextAction}
                </p>
                <p className="font-label-sm text-[11px] text-on-surface-variant">
                  Dashboard & Roadmap page are 100% synchronized to this single source of truth.
                </p>
              </div>
            </div>
          </div>

          {/* Sequential Phases List (All Phases Always Visible In Original Order 1..N) */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant/20">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Career Pathway Phases
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Sequential roadmap stages from Phase 1 to Phase {totalPhasesCount}
                </p>
              </div>

              <Link
                to={`/careers/${roadmap.careerId}`}
                className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">info</span>
                Career Overview
              </Link>
            </div>

            {phases.map((phase, i) => (
              <RoadmapStepItem
                key={phase.id}
                id={phase.id}
                title={phase.title}
                description={phase.description}
                stage={phase.stage}
                order={phase.order}
                status={phase.status}
                tasks={phase.tasks}
                isLast={i === phases.length - 1}
                isCompleted={phase.status === "COMPLETED"}
                isCurrent={phase.status === "CURRENT"}
                isLocked={phase.status === "LOCKED"}
                onCompletePhase={() => handleCompletePhase(phase)}
                onReopenPhase={() => handleReopenPhase(phase)}
                onToggleTask={(taskId) => handleToggleTask(phase, taskId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
