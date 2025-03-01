import { Form } from "react-bootstrap";


function DrinkPrice({
        maxPrice,
        discountWine,
        setMaxDrinkPrice,
        setDiscountWine,
    }:
    {
        maxPrice: number | undefined;
        discountWine: boolean;
        setMaxDrinkPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
        setDiscountWine: React.Dispatch<React.SetStateAction<boolean>>;
    }
    ){

    function onMaxPriceChange(value: number): void {
      setMaxDrinkPrice(value);
    }

    function onDiscountWineChange(value: boolean): void {
      setDiscountWine(value);
    }

    return (
        <Form.Group className="border-bottom mb-3 pb-3">
          <h5 className="centered">Drink Pricing</h5>

          {/* Max Price INput  */}
          <Form.Group className="mb-2">
            <Form.Label className="text-start d-block">Max Drink Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice !== undefined ? maxPrice.toFixed(2) : ""}
              onChange={(e) => onMaxPriceChange(Number(e.target.value) || 0)}
              placeholder="Max"
              step="0.5"
              min="0"
            />
          </Form.Group>

          {/* Discount Wine Checkbox  */}
          <Form.Group controlId="discountWineCheckBox">
            <Form.Check
                type="checkbox"
                label="Discount Wine Bottles"
                checked={discountWine}
                onChange={(e) => onDiscountWineChange(e.target.checked)}
                className="text-start"
            />
          </Form.Group>
        </Form.Group>
    )
}


export default DrinkPrice;