import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/assessment", label: "Assessment", icon: "quiz" },
  { to: "/careers", label: "Careers", icon: "work" },
  { to: "/roadmap", label: "Roadmap", icon: "map" },
  { to: "/compare", label: "Compare", icon: "balance" },
  { to: "/chat", label: "AI Chat", icon: "forum" },
  { to: "/profile", label: "Profile", icon: "person" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 py-unit-lg px-unit-md border-r border-outline-variant/20 bg-surface-container-low z-40 overflow-y-auto">
      <button
        onClick={() => navigate("/")}
        className="font-headline-md text-headline-md text-primary text-left px-2 mb-unit-lg"
      >
        CareerVerse
      </button>

      <div className="flex flex-col gap-1 flex-grow">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-unit-md rounded-xl p-3 transition-colors font-label-md text-label-md ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-on-surface-variant hover:bg-primary/10 hover:text-primary"
              }`
            }
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="border-t border-outline-variant/20 pt-unit-md flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm shrink-0">
          {user?.fullName?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="flex-grow min-w-0">
          <p className="font-label-md text-label-md text-on-surface truncate">{user?.fullName ?? "Guest"}</p>
          <button
            onClick={logout}
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-error transition-colors"
          >
            Logout
          </button>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
