import { Card } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Restaurant } from "../../types/Restaurant";
import { isTimeInRange } from "../../utils/timesUtils";
import { hasHappyHourGivenDayAndTime } from "../../utils/happyHourUtils";
import { hasASpecialOnGivenDay } from "../../utils/specialsUtils";
import "./Map.css"

function MapRestaurantCard({ restaurant, onSelectedRestaurant }: { restaurant: Restaurant; onSelectedRestaurant: (id: string) => void}){

    //function returns True if the restaurant has daily specials today
    function specialsAvailableToday(restaurant: Restaurant): boolean{
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        const weekday = now.getDay();
        
        return hasASpecialOnGivenDay(restaurant, weekday);
        
    }
    
    //returns true or false whether Happy Hour is available now
    function availableNowHappyHour(restaurant: Restaurant){
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        let weekday = now.getDay();
        //gets current time in 24 hour format ex. "14:30"
        const currentTime = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});

        //need to check if it is between midnight and 6 am the next day and the happy hour might be a late night happy hour
        //therefore day must be decremented and check the past days hours
        if(isTimeInRange(currentTime, "00:00", "06:00")){
            weekday = weekday === 0 ? 6 : weekday - 1;
        }
        return hasHappyHourGivenDayAndTime(restaurant, weekday, currentTime);
    }


    return (
        <Card className="map-restaurant-card" onClick={() => onSelectedRestaurant(restaurant.place_id)}>
                <div>
                {/* Restaurant Details  */}
                <div className="map-restaurant-details">
                    <h5>{restaurant.name}</h5>
                    {/* <p>{restaurant.address}, {restaurant.city}</p> */}
                </div>
                <hr/>
                {/* Specials & Happy Hour  */}
                <div className="map-restaurant-status">
                    <p>
                        <strong>Happy Hour Now:</strong>{" "}
                        {availableNowHappyHour(restaurant) ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                    <p>
                        <strong>Daily Specials Today:</strong>{" "}
                        {specialsAvailableToday(restaurant) ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                    
                </div>
            </div>
            <p className="click-hint">Click to view</p>
        </Card>

    )
}

export default MapRestaurantCard;