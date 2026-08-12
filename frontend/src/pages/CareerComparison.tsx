import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { careerService } from "@/services/careerService";
import { useAuth } from "@/context/AuthContext";
import type { Career, CareerComparisonResult, EducationLevel } from "@/types";

export default function CareerComparison() {
  const { user } = useAuth();
  const level: EducationLevel = user?.educationLevel || "BTECH";

  const [searchParams] = useSearchParams();
  const [careers, setCareers] = useState<Career[]>([]);
  const [id1, setId1] = useState(searchParams.get("id1") ?? "");
  const [id2, setId2] = useState("");
  const [result, setResult] = useState<CareerComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    careerService.getAll({ educationLevel: level }).then((res) => setCareers(res.data ?? []));
  }, [level]);

  const handleCompare = async () => {
    if (!id1 || !id2) {
      toast.error("Choose two options to compare");
      return;
    }
    if (id1 === id2) {
      toast.error("Choose two different options");
      return;
    }
    setIsComparing(true);
    try {
      const res = await careerService.compare(id1, id2);
      setResult(res.data ?? null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Couldn't compare those options right now");
    } finally {
      setIsComparing(false);
    }
  };

  const rows: { label: string; render: (c: Career) => React.ReactNode }[] = [
    { label: "Category / Domain", render: (c) => c.branch || c.category },
    { label: "Pathway / Package", render: (c) => c.salary || "Stream Pathway" },
    { label: "Overview & Focus", render: (c) => c.description },
    { label: "Key Skills / Subjects", render: (c) => (c.skills ?? []).join(", ") },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
            {level === "TENTH" ? "10th Stream & Course Comparison" : level === "INTERMEDIATE" ? "Degree & Professional Course Comparison" : "BTech Career Role Comparison"}
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">
          {level === "TENTH" ? "Compare Post-10th Streams & Diplomas" : level === "INTERMEDIATE" ? "Compare Post-Intermediate Degrees & Pathways" : "Compare Engineering Job Roles"}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Put two choices side by side to see how their subjects, skills, and future prospects compare.
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-end gap-4">
        <div className="flex-grow">
          <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Option A</label>
          <select
            value={id1}
            onChange={(e) => setId1(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">Select option A</option>
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant hidden md:block mb-3">compare_arrows</span>
        <div className="flex-grow">
          <label className="font-label-md text-label-md text-on-surface-variant block mb-2">Option B</label>
          <select
            value={id2}
            onChange={(e) => setId2(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary outline-none"
          >
            <option value="">Select option B</option>
            {careers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCompare}
          disabled={isComparing}
          className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-60 shadow-sm"
        >
          {isComparing ? "Comparing..." : "Compare"}
        </button>
      </div>

      {!result && <EmptyState icon="balance" title="Pick two options" description="Select two choices from your education category to generate a side-by-side comparison." />}

      {isComparing && <Loader label="Building side-by-side comparison..." />}

      {result && (
        <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="font-label-sm text-label-sm text-on-surface-variant pb-4 w-1/4">Comparison Metric</th>
                <th className="font-headline-sm text-headline-sm text-on-surface pb-4 font-bold text-primary">{result.careerA.title}</th>
                <th className="font-headline-sm text-headline-sm text-on-surface pb-4 font-bold text-secondary">{result.careerB.title}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-outline-variant/20">
                  <td className="font-label-md text-label-md text-on-surface-variant py-4 align-top font-semibold">{row.label}</td>
                  <td className="font-body-md text-body-md text-on-surface py-4 align-top">{row.render(result.careerA)}</td>
                  <td className="font-body-md text-body-md text-on-surface py-4 align-top">{row.render(result.careerB)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
