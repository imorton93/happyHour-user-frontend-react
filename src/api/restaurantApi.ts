import { Restaurant } from "../types/Restaurant";
import apiClient from "./apiClient";

export const fetchRestaurants = async () => {
    const response = await apiClient.get("/api");
    return processRestaurantData(response.data);
}

//processes the restaurants to allow for Drink types field
// the field shows all unique drink types and their corresponding cheapest price. Will make filtering and sorting easier.
//Right now only considers Happy Hour menu
function processRestaurantData(restaurants: Restaurant[]): Restaurant[]{
    return restaurants.map((restaurant) => {
        //extract all drinks from Happy Hour
        const happyHourDrinks = restaurant.deals.happyHour?.drinks || [];

        //calculate the cheapest price for each drink type
        const cheapestPrices: Record<string, number> = {};

        happyHourDrinks.forEach((drink) => {
            //Does not consider drinks deals with price 0, drink deals usually are % discounts rather than having an actual price
            if(drink.price === 0) return;

            if (!cheapestPrices[drink.type] || drink.price < cheapestPrices[drink.type]) {
                cheapestPrices[drink.type] = drink.price;
            }
        });

        return {
            ...restaurant,
            cheapestPrices
        }
    })
}