import { motion } from "framer-motion";
import type { ChatMessage } from "@/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[65%] px-5 py-3 rounded-2xl font-body-md text-body-md whitespace-pre-wrap ${
          isUser
            ? "bg-primary text-on-primary rounded-br-sm"
            : "bg-surface-container-high text-on-surface rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
