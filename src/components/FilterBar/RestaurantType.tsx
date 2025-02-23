import { Form } from "react-bootstrap";
import "./Filters.css"
import { SetStateAction } from "react";


function RestaurantType({
    categories,
    setRestaurantTypes,
    restaurantTypes,
    }:
    {
      categories: string[];
      setRestaurantTypes: React.Dispatch<SetStateAction<string[]>>;
      restaurantTypes: string[];
    }
    ) {
  
      function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>){
        const category = event.target.value;
        const isChecked = event.target.checked;

        setRestaurantTypes((prev) => {
          if(isChecked){
            return [...prev, category];
          } else{
            return prev.filter((type) => type !== category);
          }
        })
      }
  
  
      return (
          
                <Form.Group className="border-bottom mb-3 pb-3">
                  <h5 className="centered">Restaurant Type</h5>
                  <div className="category-list">
                  {categories.map((category) => ( 
                      <Form.Check
                      type="checkbox"
                      name= {category}
                      label= {category}
                      key= {category}
                      value={category}
                      checked={restaurantTypes.includes(category)}
                      className="text-start"
                      onChange={handleCheckboxChange}
                    />
                  ))}
                  </div>
                </Form.Group>
      )
  }
  
  export default RestaurantType;