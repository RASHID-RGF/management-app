import { apiClient } from "@/lib/api-client";

export const aiService = {
    chat: (prompt: string, context?: string) =>
        apiClient.post("/ai/chat", { prompt, context }),

    summarizeTasks: (tasks: any[]) =>
        apiClient.post("/ai/summarize-tasks", tasks),
};
