import { SetStateAction } from "react";
import { Form } from "react-bootstrap";


function Proximity({distance, proximityOn, setProximityOn, setDistance}: {
    distance: number;
    proximityOn: boolean;
    setDistance: React.Dispatch<SetStateAction<number>>;
    setProximityOn: React.Dispatch<SetStateAction<boolean>>;
}) {
    

    return (
        <Form.Group className="border-bottom pb-3">
            <h5 className="centered">Proximity</h5>
            <Form.Group controlId="availableNowCheckbox">
              <Form.Check
                type="checkbox"
                label="Set Distance"
                checked={proximityOn}
                onChange={(e) => setProximityOn(e.target.checked)}
                className="text-start"
              />
            </Form.Group>


            { proximityOn && (
                <>
                <Form.Label>Distance</Form.Label>
                <Form.Range 
                    value={distance}
                    name='distance'
                    onChange={(e) => setDistance(parseFloat(e.target.value))}
                    max={25}
                    min={0.5}
                    step={0.5}
                    disabled={!proximityOn}
                />
                
                <p>Within: {distance} km</p>
                </>
            )}
        </Form.Group>
    )
}

export default Proximity;