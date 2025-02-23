import { Badge, Card } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Restaurant } from "../../types/Restaurant";

function MapRestaurantCard({ restaurant }: { restaurant: Restaurant;}){


    return (
        <Card className="restaurant-card">
            <div className="d-flex align-items-center">
                {/* Restaurant Details  */}
                <div className="restaurant-details">
                    <h5>{restaurant.name}</h5>
                    <p className="text-muted">{restaurant.address}, {restaurant.city}</p>
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

export default MapRestaurantCard;