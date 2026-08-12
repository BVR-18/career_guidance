import type { ReactNode } from "react";

interface DashboardCardProps {
  icon: string;
  label: string;
  value: string | number;
  accent?: "primary" | "secondary" | "tertiary";
  children?: ReactNode;
}

const accentMap = {
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary-container text-on-tertiary-container",
};

export default function DashboardCard({ icon, label, value, accent = "primary", children }: DashboardCardProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accentMap[accent]}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="font-headline-md text-headline-md text-on-surface">{value}</p>
        <p className="font-label-sm text-label-sm text-on-surface-variant">{label}</p>
      </div>
      {children}
    </div>
  );
}
