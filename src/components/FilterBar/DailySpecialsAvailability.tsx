import { Accordion, Form } from "react-bootstrap";


function DailySpecialsAvailability({
        availableToday_DailySpecials,
        selectedDay_DailySpecials,
        setAvailableToday_DailySpecials,
        setSelectedDay_DailySpecials,
    }:
    {
        availableToday_DailySpecials: boolean;
        selectedDay_DailySpecials?: string;
        setAvailableToday_DailySpecials: React.Dispatch<React.SetStateAction<boolean>>;
        setSelectedDay_DailySpecials: React.Dispatch<React.SetStateAction<string>>;
    }){

      const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      function onAvailableTodayChange(value: boolean): void {
        setAvailableToday_DailySpecials(value);
        //set selected Day and Time to nothing as user is selecting available now
        setSelectedDay_DailySpecials("");
      }

      function onDayChange(value: string): void {
        setSelectedDay_DailySpecials(value);
      }


    return(
        
        <Form.Group className="border-bottom mb-3">
          <h5 className="centered">Daily Specials Availability</h5>
          {/* Available Now Checkbox */}
          <Form.Group controlId="availableNowCheckbox">
            <Form.Check
              type="checkbox"
              label="Available Today"
              checked={availableToday_DailySpecials}
              onChange={(e) => onAvailableTodayChange(e.target.checked)}
              className="text-start"
            />
          </Form.Group>

          {/* Weekday Selector */}
          <Form.Group className="mb-4">
            <Form.Label className="text-start d-block">Select a Weekday</Form.Label>
            <Form.Select 
              value={selectedDay_DailySpecials || ""} 
              onChange={(e) => onDayChange(e.target.value)}
              className="form-select-sm"
              disabled={availableToday_DailySpecials} // Disable if "Available Now" is checked
            >
              <option value="">Choose a day</option>
              {weekdays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form.Group>
    )
}

export default DailySpecialsAvailability;