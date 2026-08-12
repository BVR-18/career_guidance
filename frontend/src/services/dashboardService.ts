import axiosInstance from "@/api/axiosInstance";
import type { DashboardData, ApiResponse } from "@/types";

export const dashboardService = {
  get: () => axiosInstance.get<ApiResponse<DashboardData>>("/dashboard").then((r) => r.data),

  saveCareer: (careerId: string) =>
    axiosInstance.post<ApiResponse<null>>(`/dashboard/save-career/${careerId}`).then((r) => r.data),

  unsaveCareer: (careerId: string) =>
    axiosInstance.delete<ApiResponse<null>>(`/dashboard/save-career/${careerId}`).then((r) => r.data),
};
