import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MiniChart } from "@/components/MiniChart";
import {
  TrendingUp,
  CheckSquare,
  Clock,
  Flame,
  Activity,
  BarChart3,
  PieChart,
  Zap,
  Lightbulb,
  Target,
  CalendarDays,
  Download,
  Share2,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const PERIODS = ["Day", "Week", "Month", "Year"];

const PROJECT_PERFORMANCE = [
  { name: "Mobile App v2", tasks: 45, completion: 88, color: "bg-blue-500" },
  { name: "Marketing Site", tasks: 22, completion: 95, color: "bg-rose-500" },
  { name: "API Redesign", tasks: 31, completion: 72, color: "bg-emerald-500" },
  { name: "Design System", tasks: 18, completion: 100, color: "bg-orange-500" },
];

const WEEKLY_TASKS = [8, 12, 9, 15, 11, 18, 22];
const COMPLETION_RATES = [70, 75, 68, 82, 78, 85, 91];

const HEATMAP_DATA = [
  [2, 4, 3, 5, 1, 0, 0],
  [3, 5, 4, 6, 2, 1, 0],
  [1, 3, 5, 4, 3, 2, 1],
  [4, 6, 3, 7, 5, 1, 0],
];

const Analytics = () => {
  const { theme } = useTheme();
  const [activePeriod, setActivePeriod] = useState("Week");

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center justify-between px-8 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Analytics</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">Performance Metrics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-colors duration-500">
              {PERIODS.map(period => (
                <button
                  key={period}
                  onClick={() => setActivePeriod(period)}
                  className={cn(
                    "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                    activePeriod === period
                      ? "bg-white dark:bg-slate-700 text-primary shadow-sm dark:text-white"
                      : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800"
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Top summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: CheckSquare,
              label: "Tasks Resolved",
              value: "224",
              trend: "12.5%",
              trendUp: true,
              data: [12, 18, 15, 22, 19, 25, 22],
              color: "text-blue-600 dark:text-blue-400",
              bgColor: "bg-blue-500/10"
            },
            {
              icon: Clock,
              label: "Focus Time",
              value: "42.8h",
              trend: "5.2%",
              trendUp: true,
              data: [5, 6, 4, 8, 7, 6, 8],
              color: "text-purple-600 dark:text-purple-400",
              bgColor: "bg-purple-500/10"
            },
            {
              icon: Target,
              label: "Success Rate",
              value: "94.2%",
              trend: "2.1%",
              trendUp: false,
              data: [92, 95, 94, 91, 93, 94, 94],
              color: "text-emerald-600 dark:text-emerald-400",
              bgColor: "bg-emerald-500/10"
            },
            {
              icon: Flame,
              label: "Peak Streak",
              value: "14 Days",
              trend: "3 Days",
              trendUp: true,
              data: [1, 1, 1, 1, 1, 1, 1],
              color: "text-orange-600 dark:text-orange-400",
              bgColor: "bg-orange-500/10"
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2rem] p-6 hover:bg-white dark:hover:bg-slate-900 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group overflow-hidden relative"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2.5 rounded-xl transition-colors duration-500", stat.bgColor, stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg transition-colors duration-500",
                  stat.trendUp ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400"
                )}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="relative z-10 text-left">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">{stat.value}</h3>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 transition-colors duration-500">{stat.label}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-12 opacity-30 group-hover:opacity-60 transition-opacity translate-y-2">
                <MiniChart data={stat.data} color={i === 0 ? "hsl(var(--primary))" : i === 1 ? "#a855f7" : i === 2 ? "#10b981" : "#f97316"} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] p-8 space-y-8 transition-colors duration-500"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Productivity Matrix</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">Task output velocity over time</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Current
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 pl-4 border-l border-slate-200 dark:border-slate-800 transition-colors duration-500">
                  <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700" /> Average
                </span>
              </div>
            </div>

            <div className="h-64 relative">
              <MiniChart data={WEEKLY_TASKS} height={180} />
              <div className="absolute inset-0 flex justify-between items-end pointer-events-none px-4 pb-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                  <span key={day} className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-500">{day}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
              {[
                { label: "Velocity", val: "8.4", unit: "pts/hr", color: "text-blue-600 dark:text-blue-400" },
                { label: "Efficiency", val: "92", unit: "%", color: "text-emerald-600 dark:text-emerald-400" },
                { label: "Load", val: "Low", unit: "status", color: "text-orange-600 dark:text-orange-400" },
              ].map(m => (
                <div key={m.label} className="text-center group cursor-help">
                  <span className="block text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:scale-110 transition-all duration-300">{m.val}<span className="text-xs text-slate-400 dark:text-slate-500 font-bold ml-0.5">{m.unit}</span></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 transition-colors duration-500">{m.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights & Performance */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-primary/20"
            >
              <Lightbulb className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
              <div className="relative z-10 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Insight</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Morning Peak Efficiency</h4>
                <p className="text-primary-foreground/80 text-sm font-medium leading-relaxed mb-6">
                  According to your activity profile, you are most productive between <span className="text-white font-bold">9:00 AM and 11:30 AM</span>. Consider scheduling critical tasks then.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-primary px-4 py-2.5 rounded-xl hover:bg-white/90 transition-all shadow-lg active:scale-95">
                  Optimize Schedule <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] p-8 text-left transition-colors duration-500"
            >
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 transition-colors duration-500">Project Performance</h3>
              <div className="space-y-6">
                {PROJECT_PERFORMANCE.map(proj => (
                  <div key={proj.name} className="space-y-2 group">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">{proj.name}</span>
                      <span className="font-black text-slate-900 dark:text-white transition-colors duration-500">{proj.completion}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden transition-colors duration-500">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${proj.completion}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full rounded-full bg-primary", proj.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Heatmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] p-8 transition-colors duration-500"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="text-left">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Neural Workload Heatmap</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors duration-500">Synchronized task density across the time spectrum</p>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors duration-500">
              Less <div className="flex gap-1 px-1">
                {[0.1, 0.4, 0.7, 1].map(o => <div key={o} className="w-3 h-3 rounded-sm bg-primary" style={{ opacity: o }} />)}
              </div> More
            </div>
          </div>

          <div className="space-y-3">
            {["Morning", "Afternoon", "Evening", "Night"].map((label, ri) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 w-24 text-right pr-4 border-r border-slate-100 dark:border-slate-800 transition-colors duration-500">{label}</span>
                <div className="flex gap-2 flex-1">
                  {HEATMAP_DATA[ri].map((v, ci) => (
                    <motion.div
                      key={ci}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + ri * 0.05 + ci * 0.03 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="flex-1 h-12 rounded-xl cursor-help bg-primary shadow-sm ring-1 ring-inset ring-white/20"
                      style={{ opacity: Math.max(v / 8, 0.05) }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <span className="w-24 border-r border-transparent pr-4" />
              <div className="flex gap-2 flex-1 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-center transition-colors duration-500">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="flex-1">{d}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Analytics;
