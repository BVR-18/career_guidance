import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useTheme } from "@/context/ThemeContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
  labels: string[];
  values: number[];
  label?: string;
}

export default function BarChart({ labels, values, label = "Score" }: BarChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: isDark ? "#3b82f6" : "#0058be",
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  };

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: isDark ? "#94a3b8" : "#424754", font: { family: "Inter" } },
          },
          y: {
            grid: { color: isDark ? "rgba(255, 255, 255, 0.08)" : "#c2c6d6" },
            ticks: { color: isDark ? "#94a3b8" : "#424754", font: { family: "Inter" } },
          },
        },
      }}
    />
  );
}
