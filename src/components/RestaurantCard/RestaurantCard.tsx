import { Badge, Card } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./RestaurantCard.css"



function RestaurantCard({ restaurant, handleSelectedRestaurant }: { restaurant: Restaurant; handleSelectedRestaurant: (restaurant: Restaurant) => void;}){


    function hasASpecialOnGivenDay(restaurant: Restaurant, weekday: number): boolean{
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

    //function returns True if the restaurant has daily specials today
    function filterSpecialsAvailableToday(restaurant: Restaurant): boolean{
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        const weekday = now.getDay();
        
        return hasASpecialOnGivenDay(restaurant, weekday);
        
    }

    //takes in a string with the time forma "hh:mm" and returns a number of minutes
    function timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    //function takes in there strings in time form "hh:mm"
    // returns a boolean based on if the targe falls between the start and the end
    function isTimeInRange(target: string, start: string, end: string): boolean {
        const targetMinutes = timeToMinutes(target);
        const startMinutes = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);

        if (startMinutes <= endMinutes) {
            // Normal case: range does NOT cross midnight
            return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
        } else {
            // Special case: range crosses midnight (e.g., 23:00 - 02:00)
            return targetMinutes >= startMinutes || targetMinutes <= endMinutes;
        }
    }

    //Takes in a string in the form of 1430 or 0100, which represents a time
    //returns a string in time format of 14:30 or 01:00
    //yelp fusion has times in 1340 format by default so need to convert
    function convertToTimeFormatStr(time: string): string{
        let returnString = time;
        returnString = returnString.substring(0,returnString.length-2) + ":" + returnString.substring(returnString.length-2);
        return returnString;
    }

    //returns true if restaurant is open now
    function isOpenNow(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
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

    function hasHappyHourGivenDayAndTime(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
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

    //returns true or false whether Happy Hour is available now
    function availableNowHappyHour(restaurant: Restaurant){
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        const weekday = now.getDay();
        //gets current time in 24 hour format ex. "14:30"
        const currentTime = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
        
        return hasHappyHourGivenDayAndTime(restaurant, weekday, currentTime);
    }

    return (
        <Card className="restaurant-card card-hover" onClick={() => handleSelectedRestaurant(restaurant)}>
            <div className="d-flex align-items-center">
                {/* Image Icon */}
                <div className="restaurant-image">
                    <img src={"/img/restaurant.png"} alt={restaurant.name} />
                </div>
                
                {/* Restaurant Details  */}
                <div className="restaurant-details">
                    <h5>{restaurant.name}</h5>
                    <p>{restaurant.address}, {restaurant.city}</p>
                    {/* Categories  */}
                    {restaurant.categories.map((category, index) => (
                        <Badge key={index} pill className="category-badge">
                            {category}
                        </Badge>
                    ))}
                </div>
                {/* Specials & Happy Hour  */}
                <div className="restaurant-status">
                    <p>
                        <strong>Happy Hour on Now:</strong>{" "}
                        {availableNowHappyHour(restaurant) ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                    <p>
                        <strong>Daily Specials Today:</strong>{" "}
                        {filterSpecialsAvailableToday(restaurant) ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                </div>
            </div>
            
            
            
        </Card>

    )
}

export default RestaurantCard;