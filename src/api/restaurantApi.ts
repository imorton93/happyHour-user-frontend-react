import apiClient from "./apiClient";

export const fetchRestaurants = async () => {
    const response = await apiClient.get("/api");
    return response.data
}