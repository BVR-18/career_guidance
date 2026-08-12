import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  values: number[];
}

const palette = ["#0058be", "#006c49", "#6b38d4", "#adc6ff", "#6cf8bb", "#d0bcff"];

export default function PieChart({ labels, values }: PieChartProps) {
  const data = {
    labels,
    datasets: [{ data: values, backgroundColor: palette, borderWidth: 0 }],
  };

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: { position: "bottom", labels: { font: { family: "Inter" }, color: "#424754" } },
        },
      }}
    />
  );
}
