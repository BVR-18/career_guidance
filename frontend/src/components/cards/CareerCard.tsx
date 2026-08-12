import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Career } from "@/types";

interface CareerCardProps {
  career: Career;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export default function CareerCard({ career, isSaved, onToggleSave }: CareerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-panel rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col h-full relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
      <div className="flex justify-between items-start mb-3 relative z-10 gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm capitalize">
            {career.category}
          </span>
          {career.branch && (
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] font-medium">
              {career.branch}
            </span>
          )}
        </div>
        {onToggleSave && (
          <button
            onClick={onToggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save career"}
            className="text-primary hover:scale-110 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${isSaved ? 1 : 0}` }}>
              bookmark
            </span>
          </button>
        )}
      </div>

      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 relative z-10">{career.title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2 flex-grow relative z-10">
        {career.description}
      </p>

      <p className="font-label-md text-label-md text-secondary mb-4 relative z-10 font-semibold">
        {career.salary || (career.salaryMin ? `₹${(career.salaryMin / 100000).toFixed(0)}L – ₹${(career.salaryMax! / 100000).toFixed(0)}L` : "")}
      </p>

      <Link
        to={`/careers/${career.id}`}
        className="flex items-center text-primary font-label-md text-label-md mt-auto relative z-10 group/link"
      >
        View Details
        <span className="material-symbols-outlined ml-1 text-[18px] group-hover/link:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </Link>
    </motion.div>
  );
}
