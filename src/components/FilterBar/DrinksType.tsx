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
        <Accordion className="rounded-0 p-0">
          <Accordion.Header className="filterHeader text-start">Drink Type</Accordion.Header>
            <Accordion.Body className="bg-dark bg-gradient">
              <Form>
                {drinkTypes.map((obj: {name: string; isChecked:boolean}) => ( 
                    <Form.Check
                    type="checkbox"
                    name= {obj.name}
                    label= {obj.name}
                    onChange={(e) => handleCheckboxChange(e.target.name)}
                    checked={obj.isChecked}
                    key= {obj.name}
                    className="text-start text-white"
                  />
                ))}
              </Form>
            </Accordion.Body>
        </Accordion>
    )
}

export default DrinksType;