import { SetStateAction } from "react";
import { Badge, Button, ButtonGroup, Container, Dropdown } from "react-bootstrap";
import { useUserLocation } from "../context/UserLocationProvider";


function ButtonControls({ mapView, toggleMapView, toggleFilterView, badgeCount, orderBy, setOrderBy }: 
    { 
        mapView: boolean; 
        toggleMapView: () => void; 
        toggleFilterView: () => void; 
        badgeCount: number;
        orderBy: string;
        setOrderBy: React.Dispatch<SetStateAction<string>>;
    }){

    const { source } = useUserLocation();

    return(
        <Container className="my-3">
            <ButtonGroup className="w-100 gap-2">
                <Dropdown as={ButtonGroup} className=" rounded w-100" variant="primary">
                    <Dropdown.Toggle variant="primary" className="py-3 w-100 rounded" disabled={mapView}>
                        Sort: {orderBy}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setOrderBy('A-Z')}>A-Z</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderBy('Nearest')} disabled={source === ""}>Nearest</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderBy('Cheapest Beer')}>Cheapest Beer</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderBy('Cheapest Wine')}>Cheapest Wine</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderBy('Cheapest Cider')}>Cheapest Cider</Dropdown.Item>
                        <Dropdown.Item onClick={() => setOrderBy('Cheapest Cocktail')}>Cheapest Cocktail</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button className="py-3 rounded w-100" variant="primary" onClick={toggleFilterView}>Filter  <Badge bg="secondary">{badgeCount}</Badge></Button>
                <Button className="py-3 rounded w-100" variant="primary" onClick={toggleMapView}>{mapView ? 'List View' : 'Map View'}</Button>
            </ButtonGroup>
        </Container>
    )
}

export default ButtonControls;