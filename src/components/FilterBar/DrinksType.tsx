import { ChangeEvent } from "react";
import { Accordion, Card, Form } from "react-bootstrap";


function DrinksType({
  drinkTypes,
  setDrinkTypes,
  }:
  {
    drinkTypes: { name: string; isChecked:boolean}[];
    setDrinkTypes: React.Dispatch<React.SetStateAction<{name: string; isChecked: boolean}[]>>
  }
  ) {


    function handleCheckboxChange(value: string): void {
        setDrinkTypes(drinkTypes.map((item) => {
          if(item.name === value){
            return {...item, isChecked: !item.isChecked}
          }else{
            return item;
          }
        }))
    }

    return (
        
              <Form.Group className="border-bottom mb-3 pb-3">
                <h5 className="centered">Drink Types</h5>
                {drinkTypes.map((obj: {name: string; isChecked:boolean}) => ( 
                    <Form.Check
                    type="checkbox"
                    name= {obj.name}
                    label= {obj.name}
                    onChange={(e) => handleCheckboxChange(e.target.name)}
                    checked={obj.isChecked}
                    key= {obj.name}
                    className="text-start"
                  />
                ))}
              </Form.Group>
    )
}

export default DrinksType;