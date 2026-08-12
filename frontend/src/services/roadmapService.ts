import axiosInstance from "@/api/axiosInstance";
import type { Roadmap, ApiResponse } from "@/types";

export const roadmapService = {
  getForCareer: (careerId: string) =>
    axiosInstance.get<ApiResponse<Roadmap>>(`/roadmap/${careerId}`).then((r) => r.data),

  getProgress: (careerId: string) =>
    axiosInstance
      .get<ApiResponse<{ careerId: string; completedStepIds: string[]; progress?: number }>>(
        `/roadmap/${careerId}/progress`
      )
      .then((r) => r.data),

  saveProgress: (careerId: string, stepIds: string[]) =>
    axiosInstance
      .put<ApiResponse<Roadmap>>(
        `/roadmap/${careerId}/progress`,
        { stepIds }
      )
      .then((r) => r.data),

  reopenPhase: (careerId: string, reopenPhaseId: string) =>
    axiosInstance
      .put<ApiResponse<Roadmap>>(
        `/roadmap/${careerId}/progress`,
        { reopenPhaseId, action: "reopen" }
      )
      .then((r) => r.data),
};
