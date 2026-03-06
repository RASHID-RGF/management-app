import { motion } from "framer-motion";
import { Sparkles, Clock, User, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { icon: Sparkles, text: 'AI generated 3 subtasks for "Q1 Launch"', time: "2m ago", color: "text-primary" },
  { icon: User, text: 'Sarah completed "Update API docs"', time: "15m ago", color: "text-success" },
  { icon: FolderKanban, text: 'New project "Mobile App v2" created', time: "1h ago", color: "text-info" },
  { icon: Clock, text: 'Deadline approaching: "Design Review"', time: "2h ago", color: "text-warning" },
  { icon: User, text: 'Alex commented on "Auth flow"', time: "3h ago", color: "text-muted-foreground" },
];

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
          className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200 cursor-pointer group"
        >
          <div className={cn("p-2.5 rounded-xl bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white ring-offset-2 ring-primary/20", item.color)}>
            <item.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 leading-tight mb-1 group-hover:text-slate-900 transition-colors">{item.text}</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Team</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
