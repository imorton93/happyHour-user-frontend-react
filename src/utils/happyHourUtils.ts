import { Restaurant } from "../types/Restaurant";
import { isOpenNow } from "./openNowUtils";
import { isTimeInRange } from "./timesUtils";

export function hasHappyHourGivenDayAndTime(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
    let returnVal = false;
    //check if the restaurant is open now
    if(isOpenNow(restaurant, weekday, currentTime)){
        //checks if restaurant has happy hour
        if(restaurant.deals.happyHour.hasDeals){
            //loop through all the times for happy hour
            restaurant.deals.happyHour.times.forEach((hours) => {
                //checks if the times include today
                if(hours.days.includes(weekday)){
                    //if the happy hour goes till close will put in 6am or "06:00"
                    //already know that the business is open so just need to make sure past the start time
                    if(hours.to === ""){
                        if(isTimeInRange(currentTime, hours.from, "06:00")){
                            returnVal = true;
                        }
                    }else{
                        if(isTimeInRange(currentTime, hours.from, hours.to)){
                            returnVal = true;
                        }
                    }
                }
            })
        }
    }
    return returnVal;
}