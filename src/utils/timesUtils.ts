//function takes in there strings in time form "hh:mm"
// returns a boolean based on if the targe falls between the start and the end
export function isTimeInRange(target: string, start: string, end: string): boolean {
    const targetMinutes = timeToMinutes(target);
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    if (startMinutes <= endMinutes) {
        // Normal case: range does NOT cross midnight
        return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
    } else {
        // Special case: range crosses midnight (e.g., 23:00 - 02:00)
        return targetMinutes >= startMinutes || targetMinutes <= endMinutes;
    }
}

//Takes in a string in the form of 1430 or 0100, which represents a time
//returns a string in time format of 14:30 or 01:00
//yelp fusion has times in 1340 format by default so need to convert
export function convertToTimeFormatStr(time: string): string{
    let returnString = time;
    returnString = returnString.substring(0,returnString.length-2) + ":" + returnString.substring(returnString.length-2);
    return returnString;
}


//takes in a string with the time forma "hh:mm" and returns a number of minutes
function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}