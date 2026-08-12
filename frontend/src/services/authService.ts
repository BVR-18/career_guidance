import axiosInstance from "@/api/axiosInstance";
import type { AuthResponse, LoginPayload, RegisterPayload, User, ApiResponse } from "@/types";

export const authService = {
  login: (payload: LoginPayload) =>
    axiosInstance.post<AuthResponse>("/auth/login", payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    axiosInstance.post<AuthResponse>("/auth/register", payload).then((r) => r.data),

  getProfile: () =>
    axiosInstance.get<ApiResponse<User>>("/auth/profile").then((r) => r.data),
};
