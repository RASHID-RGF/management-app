import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Sparkles,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/projects" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: Sparkles, label: "AI Assistant", path: "/ai" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface AppSidebarProps {
  onCommandOpen: () => void;
}

export function AppSidebar({ onCommandOpen }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="h-screen flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl sticky top-0 z-30 transition-colors duration-500"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/10">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex flex-col"
            >
              <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight leading-none transition-colors duration-500">
                NeuraBoard
              </span>
              <span className="text-[10px] text-primary font-bold mt-1 tracking-wider uppercase">
                Enterprise
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search trigger */}
      <div className="px-4 pt-6">
        <button
          onClick={onCommandOpen}
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-200 group",
            collapsed && "justify-center px-0"
          )}
        >
          <Search className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left font-medium">Search…</span>
              <kbd className="text-[10px] bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-md px-1.5 py-0.5 font-mono border border-slate-200 dark:border-slate-800 shadow-sm">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group",
                active
                  ? "text-primary bg-primary/5 shadow-sm shadow-primary/5"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                collapsed && "justify-center"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 relative z-10 transition-transform group-hover:scale-110",
                active ? "text-primary" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white"
              )} />
              {!collapsed && <span className="relative z-10">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Session Info / New Project */}
      <div className="px-4 pb-4 space-y-4">
        <button
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 active:scale-95 group",
            collapsed && "justify-center"
          )}
        >
          <Plus className="w-5 h-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" />
          {!collapsed && <span>New Project</span>}
        </button>

        <div className={cn(
          "group relative p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors duration-500",
          collapsed && "justify-center px-0"
        )}>
          <div className="flex items-center gap-3 min-w-0">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-lg object-cover flex-shrink-0 shadow-sm" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary/80 to-purple-600/80 flex-shrink-0 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                {getInitials(user?.displayName || null)}
              </div>
            )}
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate transition-colors duration-500">
                  {user?.displayName || "User"}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-500 truncate transition-colors duration-500">
                  {user?.email}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          {collapsed && (
            <button
              onClick={handleLogout}
              className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 rounded-lg shadow-xl z-50 text-rose-500"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <div className="border-t border-slate-100 dark:border-slate-800 p-3 flex justify-center transition-colors duration-500">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
