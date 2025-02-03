import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../api/restaurantApi";


export const useRestaurants = () => {
    return useQuery({
        queryKey: ["restaurants"],
        queryFn: fetchRestaurants,
    });
};