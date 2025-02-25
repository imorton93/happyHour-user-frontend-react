import { Card, Col, Row } from "react-bootstrap";
import "./DetailWindow.css";

//takes the price of the item which is given in cents ex. 3454
// returns the number in form of dollars ex. 34.54
function convertPrice(price: number){
    let returnString = price.toString();
    returnString = "$" + returnString.substring(0,returnString.length-2) + "." + returnString.substring(returnString.length-2);
    return returnString;
}


function ItemCard({ name, price, description}:
    {
        name: string;
        price: number;
        description: string;
    }
    ){

    //If the item does not have a price, make the price string an empty string
    const priceString = price !== 0 ? convertPrice(price) : "";

    return (
        <Card className="custom-card mx-3 border-0">
            <Row className="align-items-center">
                <Col xs={8}>
                    <Card.Title className="custom-card-title">{name}</Card.Title>
                    
                </Col>
                <Col xs={4} className="d-flex justify-content-end">
                    <Card.Subtitle className="pt-2 custom-card-price">{priceString}</Card.Subtitle>
                </Col>
            </Row>
            <Row>
                <Card.Text className="custom-card-text"><i>{description}</i></Card.Text>
            </Row>
            
        </Card>
    )
}

export default ItemCard;