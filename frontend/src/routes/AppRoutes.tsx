import { Routes, Route } from "react-router-dom";
import PublicLayout from "@/components/layout/PublicLayout";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Careers from "@/pages/Careers";
import CareerDetails from "@/pages/CareerDetails";
import NotFound from "@/pages/NotFound";

import Dashboard from "@/pages/Dashboard";
import Assessment from "@/pages/Assessment";
import AssessmentResult from "@/pages/AssessmentResult";
import CareerComparison from "@/pages/CareerComparison";
import Roadmap from "@/pages/Roadmap";
import Chat from "@/pages/Chat";
import Profile from "@/pages/Profile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public, marketing-shell pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<CareerDetails />} />
      </Route>

      {/* Authenticated, app-shell pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment/result" element={<AssessmentResult />} />
          <Route path="/compare" element={<CareerComparison />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:careerId" element={<Roadmap />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Category-Specific Protected Dashboard Routes */}
      <Route element={<ProtectedRoute requiredLevel="TENTH" />}>
        <Route element={<AppLayout />}>
          <Route path="/tenth/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredLevel="INTERMEDIATE" />}>
        <Route element={<AppLayout />}>
          <Route path="/intermediate/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute requiredLevel="BTECH" />}>
        <Route element={<AppLayout />}>
          <Route path="/btech/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
