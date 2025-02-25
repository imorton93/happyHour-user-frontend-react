

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
                    <p className="px-2 my-1 d-flex justify-content-end">Every Day : All Day</p>
                )
            } else{
                return(
                    <p className="px-2 my-1 d-flex justify-content-end">{dayStretches} : All Day</p>
                )
            }
        }else{
            if(everyDay){
                return(
                    <p className="px-2 my-1 d-flex justify-content-end">Every Day : {startTime}-{endTime}</p>
                )
            }else{
                return(
                    <p className="px-2 my-1 d-flex justify-content-end">{dayStretches} : {startTime}-{endTime}</p>
                )
            }
        }

}

export default HappyHourTimes;