import { useState } from "react";
import { Form } from "react-bootstrap";


function RadioButtonGroup({ selectedOption, setSelectedOption }:
    {
        selectedOption: string;
        setSelectedOption: React.Dispatch<React.SetStateAction<string>>   
    }
){

    //const [selectedOption, setSelectedOption] = useState<string>("Happy Hour");


    return(
        <Form className="d-flex justify-content-center">
            <div className="d-flex">
                <Form.Check
                    type="radio"
                    label="Happy Hour"
                    name="radioGroup"
                    value="Happy Hour"
                    checked={selectedOption === "Happy Hour"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="me-3"
                />
                <Form.Check 
                    type="radio"
                    label="Daily Specials"
                    name="radioGroup"
                    value="Daily Specials"
                    checked={selectedOption === "Daily Specials"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                />
            </div>
        </Form>
    )
}

export default RadioButtonGroup;