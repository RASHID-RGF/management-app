import { apiClient } from "@/lib/api-client";

export interface Project {
    id: number;
    name: string;
    description: string;
    category: string;
    status: string;
    progress: number;
    color: string;
    members: number;
    tasks: number;
}

export const projectService = {
    getAll: () => apiClient.get("/projects/"),
    getById: (id: number) => apiClient.get(`/projects/${id}`),
    create: (project: Omit<Project, "id">) => apiClient.post("/projects/", project),
    delete: (id: number) => apiClient.delete(`/projects/${id}`),
};
