import { Restaurant } from "../../types/Restaurant";



function SpecialDayTimes({ selectedRestaurant, weekIndex, index }:
    {
        selectedRestaurant: Restaurant;
        weekIndex: number;
        index: number;
    }
){

    const allDay = selectedRestaurant.deals.dailySpecials.days[weekIndex].times[index].allDay;
    const from = selectedRestaurant.deals.dailySpecials.days[weekIndex].times[index].from;
    const to = selectedRestaurant.deals.dailySpecials.days[weekIndex].times[index].to;

    if(allDay){
        return (
            <p>All Day</p>
        )
    } else{
        return(
            <p>{from}-{to}</p>
        )
    }
}

export default SpecialDayTimes;