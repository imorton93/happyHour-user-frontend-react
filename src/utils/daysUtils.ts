


//takes string of weekday and returns number
export function strWeekdayToNum(weekday: string): number{
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //get a representation of weekday as a number, 0 -> Sunday, 1 -> Monday
    return weekdays.indexOf(weekday);
}