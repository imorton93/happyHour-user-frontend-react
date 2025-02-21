import { Badge, Button, ButtonGroup, Container } from "react-bootstrap";


function ButtonControls({ mapView, toggleMapView, toggleFilterView }: { mapView: boolean; toggleMapView: () => void; toggleFilterView: () => void}){

    function handleSort(){
        console.log('not configured yet')
    };


    return(
        <Container className="my-3">
            <ButtonGroup className="w-100 gap-2">
                <Button className="rounded" variant="primary" onClick={handleSort}>Sort</Button>
                <Button className="rounded" variant="primary" onClick={toggleFilterView}>Filter  <Badge bg="secondary">0</Badge></Button>
                <Button className="rounded" variant="primary" onClick={toggleMapView}>{mapView ? 'List View' : 'Map View'}</Button>
            </ButtonGroup>
        </Container>
    )
}

export default ButtonControls;