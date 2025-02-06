import { Alert, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Restaurant } from "../types/Restaurant";
import { useState } from "react";
import DetailWindow from "./DetailWindow/DetailWindow";



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
                        <Card className="p-0 bg-info card-hover" onClick={() => handleSelectedRestaurant(restaurant)} style={{ cursor: "pointer"}}>
                            <Card.Body className="p-0">
                                <Card.Title className="p-0">{restaurant.name}</Card.Title>
                                <Card.Text className="p-0">{restaurant.address} - {restaurant.city}</Card.Text>
                            </Card.Body>
                        </Card>
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