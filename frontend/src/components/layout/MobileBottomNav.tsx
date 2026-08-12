import { NavLink } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Home", icon: "dashboard" },
  { to: "/careers", label: "Careers", icon: "work" },
  { to: "/roadmap", label: "Roadmap", icon: "map" },
  { to: "/chat", label: "Chat", icon: "forum" },
  { to: "/profile", label: "Profile", icon: "person" },
];

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 pb-safe bg-surface/90 dark:bg-surface-container-highest/90 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-xl">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
              isActive ? "text-primary" : "text-on-surface-variant"
            }`
          }
        >
          <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
          <span className="font-label-sm text-label-sm">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
