import { Alert, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Restaurant } from "../types/Restaurant";
import { useState } from "react";
import DetailWindow from "./DetailWindow/DetailWindow";
import RestaurantCard from "./RestaurantCard/RestaurantCard";



function ListContainer({ 
        restaurants,
    }:
    {
        restaurants: Restaurant[];
    }){

    const[showModal, setShowModal] = useState(false);
    const[selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    const handleSelectedRestaurant = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowModal(true);
    }


    return(
    <Container className="border border-success h-75 bg-dark bg-gradient" style={{ overflowY: "auto"}}>
        <Row>
            <Col>

                {/* Check if restaurants is empty */}
                {restaurants.length === 0 ? (
                    <Alert className="mt-2" variant="warning">No restaurants or bars found</Alert>
                ) : (
                <ListGroup >
                    {restaurants.map((restaurant) => (
                    <ListGroup.Item
                        key={restaurant.yelpid}
                        className="bg-transparent border-0"
                        >
                        <RestaurantCard restaurant={restaurant} handleSelectedRestaurant={handleSelectedRestaurant}/>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            
            </Col>
        </Row>
        
        <DetailWindow selectedRestaurant={selectedRestaurant} showModal={showModal} setShowModal={setShowModal} ></DetailWindow>
    </Container>
    );
};

export default ListContainer;