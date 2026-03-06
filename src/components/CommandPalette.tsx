import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Sparkles,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react";

const commands = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", group: "Navigation" },
  { icon: FolderKanban, label: "Projects", path: "/projects", group: "Navigation" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks", group: "Navigation" },
  { icon: Sparkles, label: "AI Assistant", path: "/ai", group: "Navigation" },
  { icon: BarChart3, label: "Analytics", path: "/analytics", group: "Navigation" },
  { icon: Settings, label: "Settings", path: "/settings", group: "Navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (path: string) => {
      navigate(path);
      onOpenChange(false);
      setQuery("");
    },
    [navigate, onOpenChange]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].path);
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, handleSelect, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="glass-strong rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <kbd className="text-[10px] text-muted-foreground bg-secondary rounded px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">No results found.</p>
                )}
                {filtered.map((cmd, i) => (
                  <button
                    key={cmd.path}
                    onClick={() => handleSelect(cmd.path)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      i === selectedIndex
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <cmd.icon className="w-4 h-4" />
                    <span className="flex-1 text-left font-medium">{cmd.label}</span>
                    {i === selectedIndex && <ArrowRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
