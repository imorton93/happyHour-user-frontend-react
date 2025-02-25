import { Container } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import SpecialDays from "./SpecialDays";
import { v4 as uuidv4 } from "uuid";



function DailySpecialsPage({ selectedRestaurant }:
    {
        selectedRestaurant: Restaurant;
    }
){

    const days = selectedRestaurant.deals.dailySpecials.days;
    const intDays = [];

    for(let i=0; i < days.length; i++){
        if(days[i].hasDeals){
            intDays.push(days[i].day);
        }
    }

    return(
        <Container>
            <h3 className="px-2 my-1">Daily Specials</h3>


            {intDays.map((item) => (
                <SpecialDays key={uuidv4()} selectedRestaurant={selectedRestaurant} weekDay={item} />
            ))}
        </Container>

    )
}

export default DailySpecialsPage;