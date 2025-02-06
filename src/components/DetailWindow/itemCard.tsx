import { Card } from "react-bootstrap";

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
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{priceString}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
        </Card>
    )
}

export default ItemCard;