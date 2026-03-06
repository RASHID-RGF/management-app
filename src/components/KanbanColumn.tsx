import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Calendar, MessageSquare } from "lucide-react";

export type TaskPriority = "urgent" | "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskItem {
  id: string;
  title: string;
  priority: TaskPriority;
  assignee?: string;
  dueDate?: string;
  comments?: number;
  tags?: string[];
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  urgent: { label: "Urgent", className: "bg-destructive/15 text-destructive" },
  high: { label: "High", className: "bg-warning/15 text-warning" },
  medium: { label: "Medium", className: "bg-info/15 text-info" },
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
};

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: TaskItem[];
  count: number;
  index: number;
}

export function KanbanColumn({ title, tasks, count, index }: KanbanColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex-1 min-w-[280px] max-w-[360px]"
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="text-xs bg-secondary text-muted-foreground rounded-full px-2 py-0.5">
            {count}
          </span>
        </div>
        <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
            className="glass rounded-lg p-3.5 cursor-pointer hover:bg-accent/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className={cn(
                  "text-[10px] font-medium rounded-full px-2 py-0.5",
                  priorityConfig[task.priority].className
                )}
              >
                {priorityConfig[task.priority].label}
              </span>
              <button className="p-0.5 rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
            {task.tags && (
              <div className="flex gap-1.5 mb-2 flex-wrap">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-primary/10 text-primary rounded px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-3 text-xs">
                {task.dueDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {task.dueDate}
                  </span>
                )}
                {task.comments !== undefined && task.comments > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {task.comments}
                  </span>
                )}
              </div>
              {task.assignee && (
                <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
                  {task.assignee.charAt(0)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
