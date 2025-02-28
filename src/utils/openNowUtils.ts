import { Restaurant } from "../types/Restaurant";
import { convertToTimeFormatStr, isTimeInRange } from "./timesUtils";


//returns true if restaurant is open now
export function isOpenNow(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
    let returnVal = false;
    let businessHours = restaurant.business_hours;
    for (let i = 0; i < businessHours.length; i++){
        //checks if the right day of the week
        if(weekday === businessHours[i].day){
            let startTime = convertToTimeFormatStr(businessHours[i].start);
            let endTime = convertToTimeFormatStr(businessHours[i].end);
            //checks if in time range
            if(isTimeInRange(currentTime, startTime, endTime)){
                returnVal = true;
                break;
            }
        }
    }
    return returnVal;
}