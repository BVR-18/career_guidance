import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

const links = [
  { to: "/careers", label: "Careers" },
  { to: "/roadmap", label: "Roadmaps" },
  { to: "/chat", label: "AI Guidance" },
];

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-surface/80 dark:bg-surface-container/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-unit-xl">
        <Link to="/" className="font-headline-md text-headline-md font-extrabold text-primary">
          CareerVerse
        </Link>

        <div className="hidden md:flex items-center gap-unit-lg">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-label-md text-label-md transition-colors ${
                  isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-unit-sm md:gap-unit-md">
          <ThemeToggle />
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:bg-primary/90 transition-colors min-h-[44px] items-center justify-center"
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden sm:flex text-on-surface-variant font-label-md text-label-md px-4 py-2 hover:text-primary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-full hover:bg-primary/90 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Get Started
              </button>
            </>
          )}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-outline-variant/30 bg-surface"
          >
            <div className="flex flex-col px-margin-mobile py-4 gap-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-label-md text-label-md text-on-surface-variant hover:text-primary"
                >
                  {l.label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                  className="text-left font-label-md text-label-md text-on-surface-variant hover:text-primary"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
