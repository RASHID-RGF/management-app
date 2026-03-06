import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index: number;
}

export function StatCard({ title, value, change, changeType, icon: Icon, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/60 relative overflow-hidden group hover:bg-white hover:border-slate-300 transition-all shadow-sm shadow-slate-200/50"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[40px] -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="p-3 rounded-2xl bg-slate-50 text-primary border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg",
            changeType === "positive" && "bg-green-500/10 text-green-600",
            changeType === "negative" && "bg-rose-500/10 text-rose-600",
            changeType === "neutral" && "bg-slate-100 text-slate-500"
          )}
        >
          {change}
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">{title}</p>
      </div>
    </motion.div>
  );
}
