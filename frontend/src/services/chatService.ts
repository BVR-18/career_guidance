import axiosInstance from "@/api/axiosInstance";
import type { ChatRequestPayload, ChatResponsePayload } from "@/types";

export const chatService = {
  send: (payload: ChatRequestPayload) =>
    axiosInstance.post<ChatResponsePayload>("/chat", payload).then((r) => r.data),
};
