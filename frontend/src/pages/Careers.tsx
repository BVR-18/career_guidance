import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import CareerCard from "@/components/cards/CareerCard";
import Skeleton from "@/components/common/Skeleton";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import { careerService } from "@/services/careerService";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import type { Career, EducationLevel } from "@/types";

const categoryHeaders: Record<EducationLevel, { title: string; subtitle: string }> = {
  TENTH: {
    title: "Post-10th Stream & Course Explorer",
    subtitle: "Explore 2-year Intermediate streams (MPC, BiPC, MEC, CEC), 3-year Polytechnic Diplomas, and ITI Trades.",
  },
  INTERMEDIATE: {
    title: "Post-Intermediate Higher Education & Professional Options",
    subtitle: "Discover BTech engineering, 3-year degrees (BSc, BCA, BCom, BA, BBA), CA, Law, Pharmacy, and Govt pathways.",
  },
  BTECH: {
    title: "BTech Branch Engineering & Job Roles",
    subtitle: "Explore branch-specific engineering and technology job roles for software, embedded, core, and biotech careers.",
  },
};

const filterChipsByLevel: Record<EducationLevel, { label: string; value: string }[]> = {
  TENTH: [
    { label: "All Post-10th Options", value: "All" },
    { label: "Intermediate Streams", value: "Physical Sciences" },
    { label: "Polytechnic Diplomas", value: "Applied Engineering" },
    { label: "ITI Trades", value: "Industrial Vocational Trades" },
    { label: "Vocational Skills", value: "Applied Vocational Skills" },
  ],
  INTERMEDIATE: [
    { label: "All Pathways", value: "All" },
    { label: "BTech Engineering Degree", value: "Engineering" },
    { label: "Computer Applications (BCA)", value: "Computer Applications" },
    { label: "Science & Data (BSc)", value: "Science" },
    { label: "Commerce & Business (BCom/BBA)", value: "Commerce" },
    { label: "Professional Law & CA", value: "Professional" },
    { label: "Healthcare & Pharma", value: "Pharmaceutical" },
    { label: "Government & Defence", value: "National Defence" },
  ],
  BTECH: [
    { label: "All BTech Branches", value: "All" },
    { label: "Computer Science (CSE/IT)", value: "Computer Science" },
    { label: "AI & Data Science", value: "AI & Data Science" },
    { label: "Electronics (ECE)", value: "Electronics & Communication" },
    { label: "Electrical (EEE)", value: "Electrical & Electronics" },
    { label: "Mechanical (ME)", value: "Mechanical Engineering" },
    { label: "Civil (CE)", value: "Civil Engineering" },
    { label: "Chemical (ChE)", value: "Chemical Engineering" },
    { label: "Biotechnology & Biomedical", value: "Biotechnology" },
  ],
};

export default function Careers() {
  const { user, isAuthenticated } = useAuth();
  const { data: dashboard, toggleSaveCareer } = useDashboard();
  const [searchParams] = useSearchParams();

  const level: EducationLevel = user?.educationLevel || "BTECH";
  const headerInfo = categoryHeaders[level];
  const levelChips = filterChipsByLevel[level];

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [branchFilter, setBranchFilter] = useState("All");
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const debouncedSearch = useDebounce(search);
  const savedIds = new Set(dashboard?.savedCareers.map((c) => c.id));

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await careerService.getAll({
          search: debouncedSearch || undefined,
          branch: branchFilter === "All" ? undefined : branchFilter,
          educationLevel: level,
        });
        setCareers(res.data ?? []);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareers();
  }, [debouncedSearch, branchFilter, level]);

  const handleToggleSave = (careerId: string) => {
    if (!isAuthenticated) {
      toast("Sign in to save options", { icon: "🔒" });
      return;
    }
    toggleSaveCareer(careerId, savedIds.has(careerId));
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-unit-xl max-w-container-max mx-auto">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
            {level === "TENTH" ? "10th Class Options" : level === "INTERMEDIATE" ? "Intermediate Degree Options" : "BTech Engineering Job Roles"}
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">{headerInfo.title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">{headerInfo.subtitle}</p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 mr-1 font-semibold">
          Filter Options:
        </span>
        {levelChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setBranchFilter(chip.value)}
            className={`px-3.5 py-1.5 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all ${
              branchFilter === chip.value
                ? "bg-primary text-on-primary font-bold shadow-sm"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${level === "TENTH" ? "streams, Polytechnic, ITI..." : level === "INTERMEDIATE" ? "degrees, BTech, CA, Law..." : "engineering job roles, skills..."}`}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <ErrorState description="We couldn't load options right now." onRetry={() => setSearch((s) => s)} />
      )}

      {!isLoading && !error && careers.length === 0 && (
        <EmptyState icon="search_off" title="No options found" description="Try selecting a different filter or clearing search." />
      )}

      {!isLoading && !error && careers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              isSaved={savedIds.has(career.id)}
              onToggleSave={() => handleToggleSave(career.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
