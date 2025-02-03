import apiClient from "./apiClient";

export const getRequestTest = async () => {
    const response = await apiClient.get("/api");
    return response.data
}