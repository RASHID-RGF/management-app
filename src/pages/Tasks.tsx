import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { taskService, Task as TaskType } from "@/services/taskService";
import { toast } from "sonner";
import {
  Plus,
  Filter,
  Search,
  Layout,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  MoreHorizontal,
  ChevronRight,
  GripVertical,
  MessageSquare,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

type TaskPriority = "urgent" | "high" | "medium" | "low";
type TaskStatus = "todo" | "in-progress" | "done";

interface TaskItem {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  comments: number;
  tags: string[];
  status: TaskStatus;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: "1", title: "Design onboarding flow", description: "Create a 5-step interactive onboarding for new users", priority: "high", assignee: "Sarah", dueDate: "Mar 10", comments: 3, tags: ["Design", "UX"], status: "todo" },
  { id: "2", title: "Write API documentation", description: "Document all endpoints for v3 release", priority: "medium", assignee: "Alex", dueDate: "Mar 12", comments: 0, tags: ["Docs"], status: "todo" },
  { id: "3", title: "Set up CI/CD pipeline", description: "Automate deployment to staging environment", priority: "low", assignee: "Jordan", dueDate: "Mar 15", comments: 1, tags: ["Infra"], status: "todo" },
  { id: "4", title: "Implement auth flow", description: "Add JWT and OAuth2 social logins", priority: "urgent", assignee: "Jordan", dueDate: "Mar 3", comments: 7, tags: ["Backend", "Security"], status: "in-progress" },
  { id: "5", title: "Build dashboard charts", description: "Use Chart.js for real-time visualization", priority: "high", assignee: "Sarah", dueDate: "Mar 6", comments: 2, tags: ["Frontend"], status: "in-progress" },
  { id: "6", title: "Database schema design", description: "Finalize SQL relations for v3", priority: "high", assignee: "Alex", dueDate: "Mar 1", comments: 5, tags: ["Backend"], status: "done" },
  { id: "7", title: "Setup project structure", description: "Initial Vite + React + Tailwind setup", priority: "medium", assignee: "Jordan", dueDate: "Feb 28", comments: 0, tags: ["Setup"], status: "done" },
];

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "To Do", color: "bg-slate-500" },
  { id: "in-progress", title: "In Progress", color: "bg-primary" },
  { id: "done", title: "Done", color: "bg-green-500" },
];

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  urgent: "bg-rose-50 text-rose-600 border-rose-100",
  high: "bg-orange-50 text-orange-600 border-orange-100",
  medium: "bg-blue-50 text-blue-600 border-blue-100",
  low: "bg-slate-50 text-slate-600 border-slate-100",
};

const Tasks = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectId] = useState(1); // Default project for now
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", status: "todo" });

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getByProject(projectId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks");
      setTasks(INITIAL_TASKS as any); // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;

    try {
      const taskData = {
        ...newTask,
        assignee: "JD",
        due_date: "Mar 20",
        comments_count: 0,
        tags: ["New"],
        project_id: projectId
      };

      const createdTask = await taskService.create(taskData);
      setTasks([...tasks, createdTask]);
      setIsModalOpen(false);
      setNewTask({ title: "", description: "", priority: "medium", status: "todo" });
      toast.success("Task initialized");
    } catch (error) {
      toast.error("Failed to create task");
    }
  };

  const moveTask = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let nextStatus = "todo";
    if (task.status === "todo") nextStatus = "in-progress";
    else if (task.status === "in-progress") nextStatus = "done";

    try {
      const updatedTask = await taskService.update(taskId, { status: nextStatus });
      setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center justify-between px-8 h-16 max-w-[1600px] mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layout className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Kanban</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">Task Orchestrator</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Find a task..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-48 lg:w-64 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors duration-500"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-180px)]">
          {COLUMNS.map((column, colIdx) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIdx * 0.1, duration: 0.5 }}
              className="flex-1 min-w-[320px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className={cn("w-1.5 h-6 rounded-full", column.color)} />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">{column.title}</h3>
                  <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-500 dark:text-slate-400 transition-colors duration-500">
                    {filteredTasks.filter(t => t.status === column.id).length}
                  </span>
                </div>
                <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 bg-slate-100/30 dark:bg-slate-900/30 rounded-[2.5rem] p-4 border border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-4 transition-colors duration-500">
                <AnimatePresence mode="popLayout">
                  {filteredTasks
                    .filter(t => t.status === column.id)
                    .map((task, i) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -15 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 hover:border-slate-300 dark:hover:border-slate-600 transition-all group flex flex-col gap-4 cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors duration-500",
                            theme === 'dark'
                              ? "bg-slate-900 text-slate-300 border-slate-700"
                              : PRIORITY_COLORS[task.priority]
                          )}>
                            {task.priority}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => moveTask(task.id)}
                              className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all text-left"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">{task.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium transition-colors duration-500">{task.description}</p>
                        </div>

                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {task.tags.map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-[9px] font-bold text-slate-500 dark:text-slate-400 tracking-wide transition-colors duration-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50 transition-colors duration-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">
                              <MessageSquare className="w-3 h-3" />
                              {task.comments_count}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors duration-500">
                              <Calendar className="w-3 h-3" />
                              {task.due_date}
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-white border-2 border-white dark:border-slate-700 shadow-sm transition-all">
                            {task.assignee.substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setNewTask(prev => ({ ...prev, status: column.id }));
                    setIsModalOpen(true);
                  }}
                  className="w-full py-5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 dark:text-slate-600 hover:text-primary dark:hover:text-primary hover:border-primary/40 dark:hover:border-primary/40 hover:bg-white dark:hover:bg-slate-800/50 transition-all group flex items-center justify-center gap-3"
                >
                  <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-black uppercase tracking-widest">Add Objective</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* New Task Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-xl w-full shadow-2xl relative overflow-hidden z-10 transition-colors duration-500"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-purple-500 to-indigo-600" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-10 text-left">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Task</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Add a new ticket to your active orchestration lane.</p>
              </div>

              <form onSubmit={addTask} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Task Title</label>
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    required
                    autoFocus
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Assign To Status</label>
                    <select
                      value={newTask.status}
                      onChange={e => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-800 dark:text-slate-200 shadow-inner appearance-none"
                    >
                      {COLUMNS.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Priority Layer</label>
                    <select
                      value={newTask.priority}
                      onChange={e => setNewTask({ ...newTask, priority: e.target.value as TaskPriority })}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-800 dark:text-slate-200 shadow-inner appearance-none"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Task Context</label>
                  <textarea
                    placeholder="Add more details about the work..."
                    rows={3}
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-[1.25rem] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-4 bg-primary text-white rounded-[1.25rem] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Initialize Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tasks;
