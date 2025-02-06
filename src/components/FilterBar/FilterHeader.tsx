import { Badge, Button, Card } from "react-bootstrap";


function FilterHeader({
        badgeCount,
        clearFilter,
        applyFilter,
    }:
    {
        badgeCount: number;
        clearFilter: () => undefined;
        applyFilter: () => undefined;
    }) {


    return (
        <Card className="rounded-0 p-0">
            <Card.Header className="text-start">Filter <Badge bg="secondary">{badgeCount}</Badge></Card.Header>
            <Card.Body className="d-flex justify-content-between p-1 bg-dark bg-gradient">
                <Button variant="primary" onClick={applyFilter} className="mt-3 btn-sm m-1">
                    Apply
                </Button>
                <Button variant="secondary" onClick={clearFilter} className="mt-3 ms-2 btn-sm m-1">
                    Reset
                </Button>
            </Card.Body>
        </Card>
    )
}

export default FilterHeader;