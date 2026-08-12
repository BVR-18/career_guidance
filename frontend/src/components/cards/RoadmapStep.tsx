import type { RoadmapTask, PhaseStatus } from "@/types";

interface RoadmapStepProps {
  id: string;
  title: string;
  description: string;
  stage: string;
  order: number;
  status: PhaseStatus;
  tasks?: RoadmapTask[];
  isLast?: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onCompletePhase: () => void;
  onReopenPhase?: () => void;
  onToggleTask?: (taskId: string) => void;
}

export default function RoadmapStepItem({
  title,
  description,
  stage,
  order,
  status,
  tasks = [],
  isLast,
  isCompleted,
  isCurrent,
  isLocked,
  onCompletePhase,
  onReopenPhase,
  onToggleTask,
}: RoadmapStepProps) {
  return (
    <div className={`flex gap-5 relative transition-all ${isLocked ? "opacity-60" : "opacity-100"}`}>
      {/* Timeline Column */}
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            if (isCompleted && onReopenPhase) {
              onReopenPhase();
            } else if (isCurrent) {
              onCompletePhase();
            }
          }}
          disabled={isLocked}
          aria-label={isCompleted ? "Phase Completed - Click to reopen" : isCurrent ? "Complete Phase" : "Locked Phase"}
          className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-label-md text-label-md font-bold transition-all shadow-sm ${
            isCompleted
              ? "bg-emerald-600 text-white ring-2 ring-emerald-500/30 hover:bg-emerald-700 cursor-pointer"
              : isCurrent
              ? "bg-primary text-on-primary ring-4 ring-primary/20 animate-pulse cursor-pointer"
              : "bg-surface-container-high text-on-surface-variant border border-outline-variant/60 cursor-not-allowed"
          }`}
        >
          {isCompleted ? (
            <span className="material-symbols-outlined text-[22px]">check</span>
          ) : isLocked ? (
            <span className="material-symbols-outlined text-[18px]">lock</span>
          ) : (
            `P${order}`
          )}
        </button>

        {!isLast && (
          <div
            className={`w-0.5 flex-grow min-h-[50px] my-1 ${
              isCompleted ? "bg-emerald-500" : isCurrent ? "bg-primary/50" : "bg-outline-variant/30"
            }`}
          />
        )}
      </div>

      {/* Content Column */}
      <div className="pb-8 flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            {stage}
          </span>
          <span
            className={`px-3 py-0.5 rounded-full font-label-sm text-[11px] font-bold tracking-wide uppercase ${
              isCompleted
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                : isCurrent
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-surface-container-high text-on-surface-variant border border-outline-variant/40"
            }`}
          >
            {isCompleted ? "Completed ✓" : isCurrent ? "Current Active Phase" : "Locked 🔒"}
          </span>
        </div>

        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1.5 flex items-center gap-2">
          <span>Phase {order}: {title}</span>
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          {description}
        </p>

        {/* Phase Checkpoints / Tasks */}
        {tasks.length > 0 && (
          <div className="mb-4 p-4 rounded-xl bg-surface-container-high/40 border border-outline-variant/30 flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold mb-1 block">
              Phase Key Tasks & Checkpoints:
            </span>
            {tasks.map((task) => (
              <label
                key={task.id}
                className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                  isLocked
                    ? "cursor-not-allowed opacity-75"
                    : "cursor-pointer hover:bg-surface-container-highest/60"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed || isCompleted}
                  disabled={isLocked}
                  onChange={() => {
                    if (isLocked) return;
                    if (onToggleTask) onToggleTask(task.id);
                  }}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer disabled:cursor-not-allowed"
                />
                <span
                  className={`font-body-sm text-body-sm ${
                    task.completed || isCompleted
                      ? "line-through text-on-surface-variant/70"
                      : "text-on-surface"
                  }`}
                >
                  {task.title}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Action Buttons for Phase States */}
        {isCurrent && (
          <button
            onClick={onCompletePhase}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Mark Phase {order} Complete
          </button>
        )}

        {isCompleted && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="font-label-sm text-label-sm text-emerald-700 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Phase {order} Completed ✓
            </span>

            {onReopenPhase && (
              <button
                onClick={onReopenPhase}
                className="font-label-sm text-label-sm text-amber-700 hover:text-amber-800 font-semibold underline flex items-center gap-1 hover:bg-amber-500/10 px-3 py-1 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">undo</span>
                Mark as Incomplete
              </button>
            )}
          </div>
        )}

        {isLocked && (
          <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant/80">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>Complete Phase {order - 1} to unlock this phase.</span>
          </div>
        )}
      </div>
    </div>
  );
}
