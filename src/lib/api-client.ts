import { auth } from "./firebase";

const BASE_URL = "http://localhost:8000/api/v1";

async function getAuthHeaders() {
    const user = auth.currentUser;
    if (!user) return {};
    const token = await user.getIdToken();
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
}

export const apiClient = {
    async get(endpoint: string) {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async post(endpoint: string, data: any) {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async put(endpoint: string, data: any) {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async delete(endpoint: string) {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: "DELETE",
            headers,
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },
};
