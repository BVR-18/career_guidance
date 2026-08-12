import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import ErrorState from "@/components/common/ErrorState";
import { careerService } from "@/services/careerService";
import { useAuth } from "@/context/AuthContext";
import { useDashboard } from "@/context/DashboardContext";
import type { Career } from "@/types";

export default function CareerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { data: dashboard, toggleSaveCareer } = useDashboard();

  const [career, setCareer] = useState<Career | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const isSaved = !!dashboard?.savedCareers.some((c) => c.id === id);

  useEffect(() => {
    if (!id) return;
    const fetchCareer = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await careerService.getById(id);
        setCareer(res.data ?? null);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCareer();
  }, [id]);

  const handleSave = () => {
    if (!isAuthenticated) {
      toast("Sign in to save careers", { icon: "🔒" });
      return navigate("/login");
    }
    if (id) toggleSaveCareer(id, isSaved);
  };

  const handleRoadmap = () => {
    if (!isAuthenticated) return navigate("/login");
    navigate(`/roadmap/${id}`);
  };

  if (isLoading) return <Loader fullScreen label="Loading career details..." />;
  if (error || !career) return <ErrorState description="We couldn't find that career." />;

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-unit-xl max-w-container-max mx-auto">
      <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm mb-4">
        {career.category}
      </span>
      <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface mb-4">{career.title}</h1>
      <p className="font-label-md text-label-md text-secondary mb-8 font-semibold">
        {career.salary || (career.salaryMin ? `₹${(career.salaryMin / 100000).toFixed(0)}L – ₹${(career.salaryMax! / 100000).toFixed(0)}L` : "")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-panel rounded-2xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">About This Career</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{career.description}</p>
          </div>

          <div className="glass-panel rounded-2xl p-8 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(career.skills ?? []).map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleRoadmap}
            className="bg-primary text-on-primary font-label-md text-label-md py-3 rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">map</span>
            Generate Roadmap
          </button>
          <button
            onClick={handleSave}
            className="border border-primary text-primary font-label-md text-label-md py-3 rounded-full hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: `'FILL' ${isSaved ? 1 : 0}` }}>
              bookmark
            </span>
            {isSaved ? "Saved" : "Save Career"}
          </button>
          <Link
            to={`/compare?id1=${career.id}`}
            className="border border-outline-variant text-on-surface font-label-md text-label-md py-3 rounded-full hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">balance</span>
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
}
