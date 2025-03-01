import { useEffect, useState } from "react";
import { Navbar, Nav, Form, Offcanvas } from "react-bootstrap";
import './Navbar.css'
import { useUserLocation } from "../../context/UserLocationProvider";

function NavBar(){
    const [title, setTitle] = useState('Enter Postal Code')
    const { geoError, postalCode, setPostalCode, source, loading } = useUserLocation();
    const [showSidebar ,setShowSidebar] = useState(false);

    useEffect(() => {
        if(source === 'postalCode'){
            setTitle('Postal Code Set!');
        } else{
            setTitle('Enter Postal Code');
        }
    }, [source])


    return (

        <>
            <Navbar bg="dark" expand="lg" className="p-2">
            <Navbar.Brand href="#" className="text-white">Vancity Happy Hour</Navbar.Brand>
                <Nav className="ms-auto">
                   <Nav.Link className="text-white" onClick={() => setShowSidebar(true)}>{title}</Nav.Link>
                </Nav>

                <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end" className="custom-sidebar">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="custom-sidebar-title">Enter Postal Code</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Form.Group controlId="postalCodeInput">
                        <Form.Label className="custom-sidebar-label">{title}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="A1A1A1"
                            value={postalCode}
                            maxLength={6}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="custom-sidebar-input"
                        />
                    </Form.Group>
                        {geoError && <p style={{ color: "red" }}>{geoError}</p>}
                        {loading && (
                            <p style={{ color: "blue" }}>
                                Loading<span className="dots"></span>
                            </p>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </Navbar>
        </>
    );
};

export default NavBar;
