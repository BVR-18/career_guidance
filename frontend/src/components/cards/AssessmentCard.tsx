import type { AssessmentQuestion } from "@/types";

interface AssessmentCardProps {
  question: AssessmentQuestion;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
}

export default function AssessmentCard({ question, selectedOptionId, onSelect }: AssessmentCardProps) {
  return (
    <div className="glass-panel rounded-2xl p-8 shadow-sm">
      <p className="font-label-sm text-label-sm text-primary mb-2 uppercase tracking-wide">{question.category}</p>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-8">{question.question}</h2>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => {
          const active = selectedOptionId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`text-left px-5 py-4 rounded-xl border font-body-md text-body-md transition-all ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant text-on-surface hover:border-primary/50 hover:bg-surface-container-high"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
