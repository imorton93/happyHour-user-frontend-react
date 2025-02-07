import { Col, Container, Row } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import HappyHourTimes from "./HappyHourTimes";
import { v4 as uuidv4 } from "uuid";
import ItemCard from "./itemCard";

interface times{
    allDay: boolean;
    from: string;
    to: string;
    desription: string;
    dayStretches: string;
    everyDay: boolean;
}

//number is range of 0-6
interface dayStretches{
    start: number;
    end: number;
}

//function takes an array of days represented by integers (0-6)=(Sunday-Saturday)
//function returns stretches of the days ex. 0-3 4-5
//Allows for easier transition to print stretches of days ex. Monday-Friday
function returnDayStretches(days: number[] | undefined){
    let result : dayStretches[] = [];
    if(days !== undefined){
        let start = days[0];
        let prev = start;
        //If the array is just one element, return immediately to avoid risk of bug on line 50
        if(days.length === 1){
            result.push({start: start, end: prev});
            return result;
        }
        //loop through days starting with second element
        for(let i = 1; i < days.length; i++){
            //if the next element in the array is not
            if(days[i] !== prev + 1){
                result.push({start: start, end: prev});
                start = days[i];
            }

            prev = days[i];

            //if loop is on last iteration add the last stretch that has not been counted
            if(i === days.length - 1){
                result.push({start:start, end: prev});
            }
        }
        // if 0 exists as start day in first element and 6 as end or last element,
        // edit first element so start of last element becomes start of first element
        // then pop the last element
        if(result[0].start === 0 && result[result.length - 1].end === 6){
            result[0].start = result[result.length - 1].start;
            result.pop();
        }
    }
    
    return result;
}

function dayStretchesToString(arr: dayStretches[]){
    let resultString = "";
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    for(let i = 0; i < arr.length; i++){
        let start = arr[i].start;
        let end = arr[i].end;
        if(resultString === ""){
            if(start === end){
                resultString = resultString.concat(weekDays[start])
            }else{
                resultString = resultString.concat(weekDays[start], "-", weekDays[end]);
            }
        } else{
            if(start === end){
                resultString.concat(",", weekDays[start]);
            }else{
                resultString.concat(",", weekDays[start], "-", weekDays[end]);
            }
        }
    }
    return resultString;
}




function HappyHourPage({
        selectedRestaurant
    }:
    {
        selectedRestaurant: Restaurant;
    }){
    
    

    //will store all Happy Hour Times to be displayed
    let finalTimes : times[] = [];
    const times = selectedRestaurant.deals.happyHour.times;
    const drinks = selectedRestaurant.deals.happyHour.drinks;
    const food = selectedRestaurant.deals.happyHour.food;

    if(times){
        //loop through all times for Happy hour
        for(let i = 0; i < times.length; i++){
            //if the length days array is 7, then happy hour is available every day
            const everyDay = times[i].days?.length === 7 ? true : false;
            let daysArr = times[i].days;

            const dayStretches : dayStretches[] = returnDayStretches(daysArr);
            const dayString : string = dayStretchesToString(dayStretches);
            
            
            finalTimes.push({
                allDay: times[i].allDay,
                from: times[i].from,
                to: times[i].to,
                dayStretches: dayString,
                everyDay: everyDay,
                desription: ""
            })

        }
    }
    

    return(
        <Container>
            <h3>Happy Hour</h3>
            {finalTimes.map((time) => (
                <HappyHourTimes key={uuidv4()} allDay={time.allDay} from={time.from} to={time.to} dayStretches={time.dayStretches} everyDay={time.everyDay}/>
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


export default HappyHourPage;