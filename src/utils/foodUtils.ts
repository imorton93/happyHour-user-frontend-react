import { Restaurant } from "../types/Restaurant";


//Gets the minimum food price for that restaurants happy hour
export function getMinFoodPrice(restaurant: Restaurant) : number {
    let min = Number.MAX_VALUE;
    if(restaurant.deals.happyHour.hasDeals){
        restaurant.deals.happyHour.food.forEach((food) => {
            if(food.price < min){
                min = food.price;
            }
        })
    }
    return min;
}