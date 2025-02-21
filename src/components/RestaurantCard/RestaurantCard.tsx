import { Badge, Card } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./RestaurantCard.css"



function RestaurantCard({ restaurant, handleSelectedRestaurant }: { restaurant: Restaurant; handleSelectedRestaurant: (restaurant: Restaurant) => void;}){


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
                    <p className="text-muted">{restaurant.address}, {restaurant.city}</p>
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
                        <strong>Daily Specials:</strong>{" "}
                        {restaurant.deals.dailySpecials.hasDeals ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                    <p>
                        <strong>Happy Hour:</strong>{" "}
                        {restaurant.deals.happyHour.hasDeals ? <FaCheck className='check-icon'/> : <FaTimes className="cross-icon"/>}
                    </p>
                </div>
            </div>
            
            
            
        </Card>

    )
}

export default RestaurantCard;