import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  CheckSquare,
  TrendingUp,
  Zap,
  Target,
  Bell,
  User,
  FolderKanban,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { MiniChart } from "@/components/MiniChart";

const stats = [
  { title: "Total Tasks", value: "248", change: "+12%", changeType: "positive" as const, icon: CheckSquare },
  { title: "Completed", value: "186", change: "+8%", changeType: "positive" as const, icon: Target },
  { title: "In Progress", value: "42", change: "-3%", changeType: "negative" as const, icon: Zap },
  { title: "Productivity", value: "94%", change: "+5%", changeType: "positive" as const, icon: TrendingUp },
];

const weeklyData = [12, 19, 14, 22, 18, 25, 31];
const completionData = [65, 72, 68, 80, 75, 88, 94];

const Dashboard = () => {
  const { user } = useAuth();

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const firstName = user?.displayName ? user.displayName.split(" ")[0] : "User";

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center justify-between px-8 h-16 max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Overview</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">Control Center</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1 transition-colors duration-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">System Online</span>
            </div>
            <button className="relative p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-600 p-[1px] shadow-sm">
              <div className="w-full h-full rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-slate-900 dark:text-white text-sm transition-colors duration-500 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  getInitials(user?.displayName || null)
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-10">
        {/* Welcome & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none transition-colors duration-500">
              Welcome back, <span className="gradient-text">{firstName}</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-3 max-w-md transition-colors duration-500">
              Your workflow is optimized. You have <span className="text-primary font-bold">6 pending tasks</span> and 2 high-priority projects requiring attention.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <button className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm shadow-slate-200/50 dark:shadow-none">
              <Target className="w-4 h-4" />
              Set Goals
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Action
            </button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <StatCard {...stat} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Featured Projects Carousel */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Active Projects Spotlight</h3>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>

          <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -600 }}
              className="flex gap-6"
            >
              {[
                { name: "Mobile App v2", progress: 68, color: "from-blue-500 to-indigo-600", tasks: 24 },
                { name: "Marketing Site", progress: 95, color: "from-rose-500 to-orange-500", tasks: 12 },
                { name: "API Redesign", progress: 42, color: "from-emerald-500 to-teal-500", tasks: 31 },
                { name: "Design System", progress: 100, color: "from-purple-500 to-pink-500", tasks: 18 },
              ].map((project, i) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[320px] bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2.5rem] p-8 shadow-sm group"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg", project.color)}>
                      <FolderKanban className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900 dark:text-white leading-none">{project.progress}%</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Progress</div>
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 group-hover:text-primary transition-colors">{project.name}</h4>

                  <div className="space-y-4">
                    <div className="h-2 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn("h-full rounded-full bg-gradient-to-r", project.color)}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <span>{project.tasks} Active Objectives</span>
                      <span className="flex items-center gap-1 text-primary">Details <TrendingUp className="w-3 h-3" /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-slate-50/50 dark:from-slate-950/50 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visual Data */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 relative overflow-hidden group shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Performance Analytics</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-500">Task completion velocity over the last 7 days</p>
                </div>
                <div className="flex gap-2">
                  {['Day', 'Week', 'Month'].map((t) => (
                    <button key={t} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${t === 'Week' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-48">
                <MiniChart data={completionData} height={180} />
              </div>
              <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </motion.div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 flex-1 relative overflow-hidden shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white transition-colors duration-500">Productivity</h3>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors duration-500">94%</span>
                <span className="text-xs font-bold text-green-500 mb-2">+12.5%</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-500">
                You're performing better than <span className="text-slate-900 dark:text-white font-bold transition-colors duration-500">88%</span> of your team this week. Keep the momentum!
              </p>
              <div className="mt-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 4 ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'} transition-colors duration-500`} />
                ))}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 h-1/2 shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors duration-500">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-500">Upcoming</h3>
              <div className="space-y-4">
                {[
                  { title: "Team Sync", time: "10:00 AM", type: "Meeting" },
                  { title: "Design Review", time: "2:30 PM", type: "Focus" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm shadow-slate-200/30 dark:shadow-none transition-colors duration-500">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center transition-colors duration-500">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white transition-colors duration-500">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 transition-colors duration-500">{item.time} • {item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Projects & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Active Projects</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Mobile App v2", progress: 68, tasks: 24, color: "from-blue-500 to-indigo-600" },
                { name: "Marketing Site", progress: 45, tasks: 18, color: "from-pink-500 to-rose-600" },
                { name: "API Redesign", progress: 82, tasks: 31, color: "from-emerald-500 to-teal-600" },
              ].map((project, i) => (
                <motion.div
                  key={project.name}
                  whileHover={{ x: 8 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="p-5 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group flex items-center gap-6 shadow-sm shadow-slate-200/50 dark:shadow-none"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                    <FolderKanban className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white transition-colors duration-500">{project.name}</span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 transition-colors duration-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden transition-colors duration-500">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${project.color}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 h-full shadow-sm shadow-slate-200/50 dark:shadow-none transition-colors duration-500"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 transition-colors duration-500">Recent Activity</h3>
            <ActivityFeed />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
