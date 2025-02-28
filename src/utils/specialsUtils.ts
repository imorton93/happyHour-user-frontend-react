import { Restaurant } from "../types/Restaurant";


export function hasASpecialOnGivenDay(restaurant: Restaurant, weekday: number): boolean{
    let returnVal = false;
    if(restaurant.deals.dailySpecials.hasDeals){
        restaurant.deals.dailySpecials.days.forEach((item) => {
            if(item.day === weekday && item.hasDeals){
                returnVal = true;
            }
        })
    }
    return returnVal;
}


