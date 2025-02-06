import { Col, Container, Row } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import SpecialDayTimes from "./SpecialDayTimes";
import ItemCard from "./itemCard";
import { v4 as uuidv4 } from "uuid";


function SpecialDays({ selectedRestaurant, weekDay }:
    {
        selectedRestaurant: Restaurant;
        weekDay: number;
    }
){

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = selectedRestaurant.deals.dailySpecials.days.find((element) => element.day === weekDay);
    const weekIndex = selectedRestaurant.deals.dailySpecials.days.findIndex((element) => element.day === weekDay);
    const times = day?.times;

    const drinks = day?.drinks;
    const food = day?.food;

    return(
        <Container>
            <h4>{weekDays[weekDay]}</h4>
            {times?.map((item, index) => (
                <SpecialDayTimes key={uuidv4()} selectedRestaurant={selectedRestaurant} weekIndex={weekIndex} index={index}/>
            ))}
            <h5>Drinks</h5>
            <Row className="g-4">
                {drinks?.map((item) =>(
                    <Col key={uuidv4()} xs={12} sm={6} md={4} lg={3}>
                        {/* xs={12} -> 1 per row, sm=6 -> 2 per row, md=4 -> 3 per row, lg={3} -> 4 per row */}
                        <ItemCard name={item.name} price={item.price} description={item.description}></ItemCard>
                    </Col>
                ))}
            </Row>

            <br></br>
            <h5>Food</h5>
            <Row className="g-4">
                {food?.map((item) =>(
                    <Col key={uuidv4()} xs={12} sm={6} md={4} lg={3}>
                        {/* xs={12} -> 1 per row, sm=6 -> 2 per row, md=4 -> 3 per row, lg={3} -> 4 per row */}
                        <ItemCard name={item.name} price={item.price} description={item.description}></ItemCard>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SpecialDays;