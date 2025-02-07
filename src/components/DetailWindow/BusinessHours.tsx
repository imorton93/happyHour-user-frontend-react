import { Restaurant } from "../../types/Restaurant";



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
            {weekdayHoursString.map((item) => {
                if(item !== ""){
                    return ( <p key={item}>{item}</p>)
                }
                
            })}
        </>
    )
}

export default BusinessHours;