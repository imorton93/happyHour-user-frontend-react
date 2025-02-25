import { Accordion, ListGroup } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import "./DetailWindow.css";



function BusinessHours({ selectedRestaurant }:
{
    selectedRestaurant: Restaurant;
}
){
    // array of strings for the weekday hours
    let weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekdayHoursString: string[] = ["", "", "", "", "", "", ""]
    selectedRestaurant.business_hours.forEach((item) => {
        let day = item.day;
        let start = item.start;
        let end = item.end;
        //checks to see if there has already been hours entered
        //sometime restaurant closes in the afternoon so there are two business hours for the same day
        if(weekdayHoursString[day] === ""){
            weekdayHoursString[day] = weekdays[day] + ":  " + start.substring(0, start.length-2) + ":" + start.substring(start.length-2) + "-" + end.substring(0,end.length-2) + ":" + end.substring(end.length-2);
        }else{
            weekdayHoursString[day] = weekdayHoursString[day] + "," + start.substring(0, start.length-2) + ":" + start.substring(start.length-2) + "-" + end.substring(0,end.length-2) + ":" + end.substring(end.length-2);
        }
    })
    
    return (
        <>
            <Accordion className="custom-accordion">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Hours</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush" className="custom-listgroup">
                            {weekdayHoursString.map((item) => {
                                if(item !== ""){
                                    return (<ListGroup.Item key={item} className="custom-listitem">{item}</ListGroup.Item>)
                                }
                                
                            })}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
        </>
    )
}

export default BusinessHours;