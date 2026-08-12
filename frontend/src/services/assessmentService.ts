import axiosInstance from "@/api/axiosInstance";
import type { AssessmentQuestion, AssessmentSubmitPayload, AssessmentResult, ApiResponse } from "@/types";

export const assessmentService = {
  getQuestions: () =>
    axiosInstance.get<ApiResponse<AssessmentQuestion[]>>("/assessment/questions").then((r) => r.data),

  submit: (payload: AssessmentSubmitPayload) =>
    axiosInstance.post<ApiResponse<AssessmentResult>>("/assessment/submit", payload).then((r) => r.data),

  getResult: () =>
    axiosInstance.get<ApiResponse<AssessmentResult>>("/assessment/result").then((r) => r.data),
};
