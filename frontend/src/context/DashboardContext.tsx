import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import toast from "react-hot-toast";
import { dashboardService } from "@/services/dashboardService";
import { useAuth } from "@/context/AuthContext";
import type { DashboardData } from "@/types";

interface DashboardContextValue {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  toggleSaveCareer: (careerId: string, isSaved: boolean) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await dashboardService.get();
      if (res.data) setData(res.data);
    } catch (err) {
      setError("Couldn't load your dashboard right now.");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const toggleSaveCareer = async (careerId: string, isSaved: boolean) => {
    try {
      if (isSaved) {
        await dashboardService.unsaveCareer(careerId);
        toast.success("Removed from saved careers");
      } else {
        await dashboardService.saveCareer(careerId);
        toast.success("Saved to your dashboard");
      }
      await refresh();
    } catch {
      toast.error("Couldn't update saved careers");
    }
  };

  return (
    <DashboardContext.Provider value={{ data, isLoading, error, refresh, toggleSaveCareer }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within a DashboardProvider");
  return ctx;
}
