import { apiClient } from "@/lib/api-client";

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    assignee: string;
    due_date: string;
    comments_count: number;
    tags: string[];
    project_id: number;
}

export const taskService = {
    getByProject: (projectId: number) => apiClient.get(`/tasks/${projectId}`),
    create: (task: Omit<Task, "id">) => apiClient.post("/tasks/", task),
    update: (id: number, task: Partial<Task>) => apiClient.put(`/tasks/${id}`, task),
    delete: (id: number) => apiClient.delete(`/tasks/${id}`),
};
