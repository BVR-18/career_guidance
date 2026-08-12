import axiosInstance from "@/api/axiosInstance";
import type { Career, CareerFilters, CareerComparisonResult, ApiResponse } from "@/types";

export const careerService = {
  getAll: (filters?: CareerFilters) =>
    axiosInstance.get<ApiResponse<Career[]>>("/careers", { params: filters }).then((r) => r.data),

  getById: (id: string) =>
    axiosInstance.get<ApiResponse<Career>>(`/careers/${id}`).then((r) => r.data),

  create: (payload: Partial<Career>) =>
    axiosInstance.post<ApiResponse<Career>>("/careers", payload).then((r) => r.data),

  update: (id: string, payload: Partial<Career>) =>
    axiosInstance.put<ApiResponse<Career>>(`/careers/${id}`, payload).then((r) => r.data),

  compare: (id1: string, id2: string) =>
    axiosInstance.get<ApiResponse<CareerComparisonResult>>("/compare", { params: { id1, id2 } }).then((r) => r.data),
};
