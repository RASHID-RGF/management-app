import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectService, Project as ProjectType } from "@/services/projectService";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Plus,
  Users,
  CheckSquare,
  Search,
  Filter,
  FolderKanban,
  X,
  Calendar,
  Layers,
  Archive,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const INITIAL_PROJECTS = [
  { id: 1, name: "Mobile App v2", description: "Next-gen mobile experience with AI-core", members: 4, tasks: 24, progress: 68, color: "from-blue-500 to-indigo-600", category: "Development", status: "Active" },
  { id: 2, name: "Marketing Site", description: "Vibrant high-conversion landing pages", members: 3, tasks: 18, progress: 45, color: "from-pink-500 to-rose-600", category: "Marketing", status: "Archived" },
  { id: 3, name: "API Redesign", description: "Internal v3 REST + GraphQL implementation", members: 5, tasks: 31, progress: 82, color: "from-emerald-500 to-teal-600", category: "Infrastructure", status: "Active" },
  { id: 4, name: "Design System", description: "Atomic UI library with Framer Motion", members: 2, tasks: 15, progress: 90, color: "from-orange-500 to-amber-600", category: "Design", status: "Active" },
  { id: 5, name: "Analytics Dashboard", description: "Real-time user behavior insights", members: 3, tasks: 22, progress: 35, color: "from-violet-500 to-purple-600", category: "Development", status: "Paused" },
  { id: 6, name: "Onboarding Flow", description: "Frictionless user activation journey", members: 2, tasks: 12, progress: 55, color: "from-blue-500 to-cyan-600", category: "UX", status: "Active" },
];

const CATEGORIES = ["All", "Development", "Marketing", "Infrastructure", "Design", "UX"];

const Projects = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New project state
  const [newProject, setNewProject] = useState({ name: "", description: "", category: "Development" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to load projects from server");
      // Fallback to initial projects if server is down (optional, but good for UX)
      setProjects(INITIAL_PROJECTS as any);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, activeCategory]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    try {
      const colors = ["from-blue-500 to-indigo-600", "from-pink-500 to-rose-600", "from-emerald-500 to-teal-600", "from-orange-500 to-amber-600"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const projectData: Omit<ProjectType, "id"> = {
        ...newProject,
        status: "Active",
        progress: 0,
        color: randomColor,
        members: 1,
        tasks: 0,
      };

      const createdProject = await projectService.create(projectData);
      setProjects([createdProject, ...projects]);
      setIsModalOpen(false);
      setNewProject({ name: "", description: "", category: "Development" });
      toast.success("Project created successfully");
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await projectService.delete(id);
      setProjects(projects.filter(p => p.id !== id));
      toast.success("Project deleted");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl transition-colors duration-500">
        <div className="flex items-center justify-between px-8 h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Projects</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">Management Hub</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Subheader & Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/40 dark:bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm transition-colors duration-500"
        >
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500">Portfolio</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide transition-colors duration-500">Currently monitoring <span className="text-slate-900 dark:text-white font-bold transition-colors duration-500">{filteredProjects.length}</span> initiatives</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64 shadow-sm text-slate-900 dark:text-white transition-colors duration-500"
              />
            </div>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 hidden md:block mx-1" />
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 transition-colors duration-500">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all",
                    activeCategory === cat
                      ? "bg-white dark:bg-slate-700 text-primary shadow-sm dark:text-white"
                      : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 rounded-[2rem] p-7 cursor-pointer hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all group relative overflow-hidden shadow-sm shadow-slate-200/50 dark:shadow-none flex flex-col h-full"
              >
                {/* Status Badge */}
                <div className="absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                  <button className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-primary transition-colors">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className={cn(
                    "w-14 h-14 rounded-[1.25rem] bg-gradient-to-br flex items-center justify-center shadow-lg shadow-black/5 ring-4 ring-white/50 dark:ring-slate-800/50",
                    project.color
                  )}>
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ring-inset transition-colors duration-500",
                    project.status === "Active" ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 ring-green-600/20" : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 ring-slate-500/20"
                  )}>
                    {project.status}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{project.category}</span>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1 transition-colors duration-500">
                      <Calendar className="w-3 h-3" /> Q3 2026
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white decoration-primary/30 group-hover:underline underline-offset-4 transition-colors duration-500">{project.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium transition-colors duration-500">{project.description}</p>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors duration-500">
                      <span>Completion Progress</span>
                      <span className="text-slate-900 dark:text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-colors duration-500">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className={cn("h-full rounded-full bg-gradient-to-r", project.color)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((u) => (
                        <div key={u} className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm relative group/avatar cursor-help transition-colors duration-500">
                          {String.fromCharCode(64 + u + i)}
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-[10px] rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none font-bold uppercase tracking-widest shadow-xl">
                            Team Member
                          </div>
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-800 bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-primary/20">
                        +{project.members}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-slate-900 dark:text-white tracking-widest">{project.tasks}</span>
                        <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Tasks</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary group-hover:bg-primary/5 dark:group-hover:bg-primary/5 transition-all">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            layout
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98, borderColor: "hsl(var(--primary))", backgroundColor: theme === 'dark' ? "rgba(15, 23, 42, 0.5)" : "white" }}
            className="rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-slate-400 dark:text-slate-600 hover:text-primary dark:hover:text-primary transition-all group min-h-[380px] shadow-sm hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none bg-transparent"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-90 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-bold text-lg tracking-tight transition-colors duration-500">Expand Portfolio</span>
            <span className="text-sm mt-2 font-medium opacity-60">Provision a new project space</span>
          </motion.button>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No projects found.</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xs">We couldn't find any projects matching your current filters. Try adjusting your query or category.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 text-primary font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>

      {/* New Project Modal */}
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
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Provision Project</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Initialize a new intelligent workspace environment.</p>
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Workspace Identity</label>
                  <input
                    type="text"
                    placeholder="e.g. Project Aurora"
                    required
                    value={newProject.name}
                    onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Category Classification</label>
                    <select
                      value={newProject.category}
                      onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[1.25rem] outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold text-slate-800 dark:text-slate-200 shadow-inner appearance-none"
                    >
                      {CATEGORIES.filter(c => c !== "All").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Priority Layer</label>
                    <div className="flex gap-2">
                      {["Low", "High", "Critical"].map(p => (
                        <button key={p} type="button" className={cn(
                          "flex-1 py-4 rounded-[1.25rem] border text-[10px] font-black uppercase tracking-widest transition-all",
                          p === "High" ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500"
                        )}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Contextual Description</label>
                  <textarea
                    placeholder="Define the primary objectives..."
                    rows={3}
                    value={newProject.description}
                    onChange={e => setNewProject({ ...newProject, description: e.target.value })}
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
                    Initialize Workspace
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

export default Projects;
