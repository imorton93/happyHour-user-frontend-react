

function HappyHourTimes({ allDay, from, to, dayStretches, everyDay}:
    {
        allDay: boolean;
        from: string;
        to: string;
        dayStretches: string;
        everyDay: boolean;
    }
    ){

        const startTime = from === "" ? "Open" : from;
        const endTime = to === "" ? "Close" : to;


        if(allDay){
            if(everyDay){
                return(
                    <p>Every Day : All Day</p>
                )
            } else{
                return(
                    <p>{dayStretches} : All Day</p>
                )
            }
        }else{
            if(everyDay){
                return(
                    <p>Every Day : {startTime}-{endTime}</p>
                )
            }else{
                return(
                    <p>{dayStretches} : {startTime}-{endTime}</p>
                )
            }
        }

}

export default HappyHourTimes;