import { Accordion, Form } from "react-bootstrap";



function DrinkPrice({
        minPrice,
        maxPrice,
        discountWine,
        setMinDrinkPrice,
        setMaxDrinkPrice,
        setDiscountWine,
    }:
    {
        minPrice: number | undefined;
        maxPrice: number | undefined;
        discountWine: boolean;
        setMinDrinkPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
        setMaxDrinkPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
        setDiscountWine: React.Dispatch<React.SetStateAction<boolean>>;
    }
    ){

    function onMinPriceChange(value: number): void {
      setMinDrinkPrice(value);
    }

    function onMaxPriceChange(value: number): void {
      setMaxDrinkPrice(value);
    }

    function onDiscountWineChange(value: boolean): void {
      setDiscountWine(value);
    }

    return (
    <Accordion className="rounded-0 p-0">
      <Accordion.Header className="text-start">Drink Price</Accordion.Header>
      <Accordion.Body className="bg-dark bg-gradient">
        <Form>
            {/* Min Price Input */}
          <Form.Group className="mb-2">
            <Form.Label className="text-start d-block text-white">Min Price</Form.Label>
            <Form.Control
              type="number"
              value={minPrice !== undefined ? minPrice.toFixed(2) : ""}
              onChange={(e) => onMinPriceChange(Number(e.target.value) || 0)}
              placeholder="Min"
              step="0.01"
              min="0"
            />
          </Form.Group>

          {/* Max Price INput  */}
          <Form.Group className="mb-2">
            <Form.Label className="text-start d-block text-white">Max Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice !== undefined ? maxPrice.toFixed(2) : ""}
              onChange={(e) => onMaxPriceChange(Number(e.target.value) || 0)}
              placeholder="Max"
              step="0.01"
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
                className="text-start text-white"
            />
          </Form.Group>
        </Form>
      </Accordion.Body>
    </Accordion>
    )
}


export default DrinkPrice;