import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Command, Zap, Brain, MessageSquare, History, Search, Plus, Trash2, MoreHorizontal, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { aiService } from "@/services/aiService";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const SUGGESTIONS = [
  { icon: <CheckSquare className="w-3.5 h-3.5" />, text: "Summarize active projects" },
  { icon: <Zap className="w-3.5 h-3.5" />, text: "Identify overdue tasks" },
  { icon: <MessageSquare className="w-3.5 h-3.5" />, text: "Draft project update" },
  { icon: <Brain className="w-3.5 h-3.5" />, text: "Suggest Q4 goals" },
];

const CAPABILITIES = [
  { title: "Task Synthesis", desc: "Convert meeting notes into actionable items" },
  { title: "Deadline Prediction", desc: "Forecast completion based on team velocity" },
  { title: "Smart Grouping", desc: "Organize fragmented tasks into cohesive epics" },
];

const AIAssistant = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Neural Assistant. I've analyzed your current workspace metrics. You have **3 projects** ahead of schedule. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await aiService.chat(input);
      const botMsg: Message = {
        role: "assistant",
        content: response.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Neural link failed. Please check your connection.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting to the neural core right now. Please try again in a moment.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50/30 dark:bg-slate-950/30 transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shrink-0 transition-colors duration-500">
        <div className="flex items-center justify-between px-8 h-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Neural AI</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">Workspace Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <History className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden max-w-[1400px] mx-auto w-full">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-white/40 dark:bg-slate-900/40 border-x border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
          {/* Messages Scroll Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar scroll-smooth">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-xl shrink-0 flex items-center justify-center shadow-sm transition-colors duration-500",
                    msg.role === "assistant" ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                  )}>
                    {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1 text-left">
                    <div className={cn(
                      "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-colors duration-500",
                      msg.role === "user"
                        ? "bg-slate-900 dark:bg-primary text-white rounded-tr-none shadow-primary/10"
                        : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none"
                    )}>
                      <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                    </div>
                    <p className={cn(
                      "text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 transition-colors duration-500",
                      msg.role === "user" ? "text-right" : "text-left"
                    )}>
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 items-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="flex gap-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-none transition-colors duration-500">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Input Area */}
          <div className="p-8 shrink-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Suggestions Chips */}
              {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={s.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                      onClick={() => setInput(s.text)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:border-primary/30 dark:hover:border-primary/30 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-sm"
                    >
                      {s.icon}
                      {s.text}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Chat Input Container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-xl group-focus-within:bg-primary/10 transition-colors pointer-events-none" />
                <div className="relative flex items-center gap-2 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-black/20 group-focus-within:border-primary/50 transition-all">
                  <div className="flex-1 flex items-center px-4">
                    <Command className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-3" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Instruct Neural AI..."
                      className="flex-1 bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none h-10"
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-all shadow-lg shadow-primary/20 active:scale-90"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] text-center transition-colors duration-500">
                Powered by NeuraBoard Advanced Language Core v4.2
              </p>
            </div>
          </div>
        </main>

        {/* Sidebar Info - Hidden on tablet/mobile */}
        <aside className="hidden lg:flex w-80 flex-col shrink-0 p-8 space-y-8 overflow-y-auto bg-white/20 dark:bg-slate-900/20 transition-colors duration-500">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 text-left transition-colors duration-500">Current Capabilities</h3>
            <div className="space-y-3">
              {CAPABILITIES.map(c => (
                <div key={c.title} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm text-left transition-colors duration-500">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-500">{c.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors duration-500">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-primary text-white text-left relative overflow-hidden group shadow-lg shadow-primary/20">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h4 className="text-sm font-black uppercase tracking-widest mb-2">Upgrade Sync</h4>
            <p className="text-[11px] font-medium opacity-80 mb-4 leading-relaxed">Unlock multi-workspace analysis and context-aware project pruning.</p>
            <button className="w-full py-2.5 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg ring-1 ring-white/20 active:scale-95 transition-all">
              Go Enterprise
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AIAssistant;
