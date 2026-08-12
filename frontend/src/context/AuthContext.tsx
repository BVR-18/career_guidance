import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";
import { TOKEN_KEY, registerUnauthorizedHandler } from "@/api/axiosInstance";
import type { LoginPayload, RegisterPayload, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Let the axios interceptor trigger logout on any 401 response
  useEffect(() => {
    registerUnauthorizedHandler(logout);
  }, [logout]);

  // Hydrate the session from a stored token on first load
  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await authService.getProfile();
        if (res.data) setUser(res.data);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (payload: LoginPayload) => {
    const res = await authService.login(payload);
    localStorage.setItem(TOKEN_KEY, res.token);
    setToken(res.token);
    setUser(res.user);
    toast.success(`Welcome back, ${res.user.fullName.split(" ")[0]}!`);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await authService.register(payload);
    localStorage.setItem(TOKEN_KEY, res.token);
    setToken(res.token);
    setUser(res.user);
    toast.success("Account created. Let's map out your future.");
  };

  const handleLogout = () => {
    logout();
    toast.success("You've been logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
