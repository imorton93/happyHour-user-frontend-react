import { Accordion, Form } from "react-bootstrap";



function FoodPrice({
        minPrice,
        maxPrice,
        setMinFoodPrice,
        setMaxFoodPrice,
    }:
    {
        minPrice: number | undefined;
        maxPrice: number | undefined;
        setMinFoodPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
        setMaxFoodPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    }
    ){

    function onMinPriceChange(value: number): void {
        setMinFoodPrice(value);
    }

    function onMaxPriceChange(value: number): void {
        setMaxFoodPrice(value);
    }


    return (
    <Accordion className="rounded-0 p-0">
      <Accordion.Header className="text-start">Food Price</Accordion.Header>
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
        </Form>
      </Accordion.Body>
    </Accordion>
    )
}


export default FoodPrice;