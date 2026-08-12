import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import AssessmentCard from "@/components/cards/AssessmentCard";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import { assessmentService } from "@/services/assessmentService";
import type { AssessmentQuestion } from "@/types";

export default function Assessment() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await assessmentService.getQuestions();
        setQuestions(res.data ?? []);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (isLoading) return <Loader fullScreen label="Preparing your assessment..." />;
  if (error) return <ErrorState description="We couldn't load the assessment." />;
  if (questions.length === 0)
    return <ErrorState title="No questions available" description="Please check back later." />;

  const current = questions[currentIndex];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLast = currentIndex === questions.length - 1;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await assessmentService.submit({
        answers: Object.entries(answers).map(([questionId, optionId]) => ({ questionId, optionId })),
      });
      navigate("/assessment/result");
    } catch {
      toast.error("Couldn't submit your assessment. Please try again.");
    } finally {
      setSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-unit-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <p className="font-label-sm text-label-sm text-primary">{progress}%</p>
      </div>
      <div className="w-full h-2 rounded-full bg-surface-container-high mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
        >
          <AssessmentCard
            question={current}
            selectedOptionId={answers[current.id]}
            onSelect={(optionId) => setAnswers((prev) => ({ ...prev, [current.id]: optionId }))}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors disabled:opacity-40"
        >
          Previous
        </button>
        {isLast ? (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={!answers[current.id]}
            className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={!answers[current.id]}
            className="px-8 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors disabled:opacity-40"
          >
            Next
          </button>
        )}
      </div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-6"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest rounded-2xl p-8 max-w-sm w-full shadow-lg"
            >
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Submit assessment?</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                You won't be able to change your answers after submitting.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
