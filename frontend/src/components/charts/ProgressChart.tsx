import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "@/context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressChart({ progress }: { progress: number }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: [
          isDark ? "#3b82f6" : "#0058be",
          isDark ? "rgba(255, 255, 255, 0.08)" : "#d9e3f6",
        ],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  return (
    <div className="relative w-40 h-40 mx-auto">
      <Doughnut
        data={data}
        options={{
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          maintainAspectRatio: true,
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline-md text-headline-md text-on-surface">{progress}%</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Complete</span>
      </div>
    </div>
  );
}
