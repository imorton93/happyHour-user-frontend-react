import { Accordion, Form } from "react-bootstrap";


function Availability({
        availableNow,
        selectedDay,
        selectedTime,
        setAvailableNow,
        setSelectedDay,
        setSelectedTime,
    }:
    {
        availableNow: boolean;
        selectedDay?: string;
        selectedTime?: string;
        setAvailableNow: React.Dispatch<React.SetStateAction<boolean>>;
        setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
        setSelectedTime: React.Dispatch<React.SetStateAction<string>>
    }){

      const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

      function onAvailableNowChange(value: boolean): void {
        setAvailableNow(value);
        //set selected Day and Time to nothing as user is selecting available now
        setSelectedDay("");
        setSelectedTime("");
      }

      function onDayChange(value: string): void {
        setSelectedDay(value);
      }

      function onTimeChange(value: string): void {
        setSelectedTime(value);
      }


    return(
        <Accordion className="rounded-0 p-0">
          <Accordion.Header className="text-start">Availability</Accordion.Header>
          <Accordion.Body className="bg-dark bg-gradient">
            <Form>
              {/* Available Now Checkbox */}
              <Form.Group controlId="availableNowCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Available Now"
                  checked={availableNow}
                  onChange={(e) => onAvailableNowChange(e.target.checked)}
                  className="text-start text-white"
                />
              </Form.Group>

              {/* Weekday Selector */}
              <Form.Group className="mb-2">
                <Form.Label className="text-start d-block text-white">Select a Weekday</Form.Label>
                <Form.Select 
                  value={selectedDay || ""} 
                  onChange={(e) => onDayChange(e.target.value)}
                  className="form-select-sm"
                  disabled={availableNow} // Disable if "Available Now" is checked
                >
                  <option value="">Choose a day</option>
                  {weekdays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Time Picker */}
              <Form.Group>
                <Form.Label className="text-start d-block text-white">Choose a Time</Form.Label>
                <Form.Control
                  type="time"
                  value={selectedTime || ""}
                  onChange={(e) => onTimeChange(e.target.value)}
                  disabled={availableNow} // Disable if "Available Now" is checked
                  className="form-control-sm"
                />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion>
    )
}

export default Availability;