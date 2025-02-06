import { Button, ButtonGroup, Col, Row } from "react-bootstrap";


function OrderBy(){

    function handleSort(){
        console.log('not configured yet')
    };


    return(
        <Row className="mb-3">
            <Col>
                <label>Order By:</label>
                <ButtonGroup className="m-2">
                    <Button variant="outline-primary">A-Z</Button>
                    <Button variant="outline-primary">Cheapest Drink</Button>
                    <Button variant="outline-primary">Cheapest Food</Button>
                    <Button variant="outline-primary">Nearest</Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default OrderBy;