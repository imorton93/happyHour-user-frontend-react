import { Badge, Card } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./RestaurantCard.css"
import { hasASpecialOnGivenDay } from "../../utils/specialsUtils";
import { isTimeInRange } from "../../utils/timesUtils";
import { hasHappyHourGivenDayAndTime } from "../../utils/happyHourUtils";



function RestaurantCard({ restaurant, handleSelectedRestaurant }: { restaurant: Restaurant; handleSelectedRestaurant: (restaurant: Restaurant) => void;}){

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
                        {specialsAvailableToday(restaurant) ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                </div>
            </div>
            
            
            
        </Card>

    )
}

export default RestaurantCard;