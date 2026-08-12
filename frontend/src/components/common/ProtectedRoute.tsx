import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/common/Loader";

interface ProtectedRouteProps {
  requiredLevel?: "TENTH" | "INTERMEDIATE" | "BTECH";
}

export default function ProtectedRoute({ requiredLevel }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Loader fullScreen label="Checking your session..." />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Guard category routes against unauthorized education level access
  if (requiredLevel && user?.educationLevel && user.educationLevel !== requiredLevel) {
    const userPath = `/${user.educationLevel.toLowerCase()}/dashboard`;
    return <Navigate to={userPath} replace />;
  }

  return <Outlet />;
}
