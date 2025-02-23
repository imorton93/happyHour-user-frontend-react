import { useMemo } from "react";
import { Restaurant } from "../types/Restaurant";

export const useRestaurantCategories = (restaurants: Restaurant[]) => {
    const uniqueCategories = useMemo(() => {
        const categorySet = new Set<string>();

        restaurants.forEach((restaurant) => {
            restaurant.categories.forEach((category) => {
                categorySet.add(category);
            });
        });

        return Array.from(categorySet).sort();
    }, [restaurants]);

    return uniqueCategories;
}