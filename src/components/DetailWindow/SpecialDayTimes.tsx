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
            <p className="px-2 my-1 d-flex justify-content-end">All Day</p>
        )
    } else{
        return(
            <p className="px-2 my-1 d-flex justify-content-end">{from}-{to}</p>
        )
    }
}

export default SpecialDayTimes;