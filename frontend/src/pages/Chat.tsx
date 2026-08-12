import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import ChatBubble from "@/components/cards/ChatBubble";
import { chatService } from "@/services/chatService";
import { useAuth } from "@/context/AuthContext";
import type { ChatMessage } from "@/types";

let idCounter = 0;
const nextId = () => `msg_${Date.now()}_${idCounter++}`;

const samplePrompts: Record<string, string[]> = {
  TENTH: [
    "Which stream should I choose after 10th: MPC, BiPC, or MEC?",
    "What are the benefits of doing a 3-year Polytechnic Diploma after 10th?",
    "How does lateral entry to 2nd year BTech work via Polytechnic?",
  ],
  INTERMEDIATE: [
    "What is BTech and what are the major engineering branches?",
    "Should I do BTech CSE or BCA / BSc Computer Science?",
    "What are non-BTech career options after Intermediate (CA, Law, Pharmacy)?",
  ],
  BTECH: [
    "How can I prepare for Full-Stack Web Developer interviews?",
    "What project ideas should I build for my BTech resume?",
    "How to prepare for DSA, Coding, and System Design interviews?",
  ],
};

export default function Chat() {
  const { user } = useAuth();
  const level = user?.educationLevel || "BTECH";
  const userId = user?.id || user?.email || "guest";
  const storageKey = `careerverse_ai_chat_${userId}_${level}`;

  const getInitialWelcomeMessage = (): ChatMessage => ({
    id: `msg_welcome_${level}`,
    role: "ai",
    content: `Hi ${user?.fullName?.split(" ")[0] || "there"}! I'm your AI Career Advisor. I'm customized for ${
      level === "TENTH"
        ? "10th Class Stream Selection"
        : level === "INTERMEDIATE"
        ? "Intermediate & BTech/Degree Guidance"
        : "BTech Job Preparation"
    }. Ask me anything!`,
    timestamp: new Date().toISOString(),
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Load Chat from LocalStorage on mount or when storageKey changes
  useEffect(() => {
    setIsChatLoaded(false);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([getInitialWelcomeMessage()]);
        }
      } else {
        setMessages([getInitialWelcomeMessage()]);
      }
    } catch (err) {
      console.error("Failed to load chat history from localStorage:", err);
      setMessages([getInitialWelcomeMessage()]);
    } finally {
      setIsChatLoaded(true);
    }
  }, [storageKey]);

  // 2. Automatically save messages to LocalStorage whenever messages update (guarded by isChatLoaded)
  useEffect(() => {
    if (!isChatLoaded) return;
    try {
      if (messages.length > 0) {
        // Keep latest 100 messages max to conserve storage
        const trimmed = messages.slice(-100);
        localStorage.setItem(storageKey, JSON.stringify(trimmed));
      }
    } catch (err) {
      console.error("Failed to save chat to localStorage:", err);
    }
  }, [messages, storageKey, isChatLoaded]);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isTyping) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsTyping(true);

    try {
      const res = await chatService.send({ message: textToSend });
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "ai", content: res.reply, timestamp: new Date().toISOString() },
      ]);
    } catch {
      toast.error("The AI guide is unavailable right now.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch (err) {
      console.error("Failed to remove stored chat:", err);
    }
    const welcomeMsg = getInitialWelcomeMessage();
    setMessages([welcomeMsg]);
    setShowClearModal(false);
    toast.success("Chat history cleared!");
  };

  const levelPrompts = samplePrompts[level] || samplePrompts.BTECH;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] max-w-3xl mx-auto">
      {/* Header Bar */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">AI Career Advisor</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Powered by Gemini AI</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold shrink-0">
            {level === "TENTH" ? "10th Student Mode" : level === "INTERMEDIATE" ? "Intermediate Mode" : "BTech Student Mode"}
          </span>
          {messages.length > 1 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="px-3 py-1 rounded-full bg-error/10 text-error hover:bg-error/20 transition-colors font-label-sm text-label-sm font-semibold shrink-0"
              title="Clear local chat history"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
        <span className="font-label-sm text-label-sm text-on-surface-variant shrink-0 font-semibold">
          Suggested Questions:
        </span>
        {levelPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors font-label-sm text-[12px] whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow overflow-y-auto glass-panel rounded-2xl p-6 shadow-sm mb-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-4">
            <div className="bg-surface-container-high rounded-2xl rounded-bl-sm px-5 py-4 flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full bg-on-surface-variant"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Message Input Box */}
      <div className="flex items-center gap-3 glass-panel rounded-full p-2 shadow-sm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about streams, BTech branches, degrees, or jobs..."
          className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface px-4 py-2 outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 shrink-0 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </div>

      {/* Clear Chat Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface glass-panel rounded-2xl p-6 max-w-md w-full shadow-xl border border-outline-variant/30"
            >
              <div className="flex items-center gap-3 mb-4 text-error">
                <span className="material-symbols-outlined text-[28px]">warning</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Clear Chat History?</h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                This will permanently remove your AI chat conversation history from this browser for your current profile.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 rounded-full border border-outline-variant text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="px-5 py-2 rounded-full bg-error text-on-error font-label-md text-label-md hover:bg-error/90 transition-colors font-bold shadow-sm"
                >
                  Clear Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
