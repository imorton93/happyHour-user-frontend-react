import { Form } from "react-bootstrap";



function FoodPrice({
        maxPrice,
        setMaxFoodPrice,
    }:
    {
        maxPrice: number | undefined;
        setMaxFoodPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    }
    ){


    function onMaxPriceChange(value: number): void {
        setMaxFoodPrice(value);
    }


    return (
    
        <Form.Group className="border-bottom pb-3">
          <h5 className="centered">Food Pricing</h5>
          {/* Max Price INput  */}
          <Form.Group className="mb-2">
            <Form.Label className="text-start d-block">Max Food Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice !== undefined ? maxPrice.toFixed(2) : ""}
              onChange={(e) => onMaxPriceChange(Number(e.target.value) || 0)}
              placeholder="Max"
              step="0.50"
              min="0"
            />
          </Form.Group>
        </Form.Group>
      
    )
}


export default FoodPrice;