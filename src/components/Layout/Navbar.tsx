import { useEffect, useState } from "react";
import { Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import './Navbar.css'
import { useUserLocation } from "../../context/UserLocationProvider";

function NavBar(){
    const [showDropDown, setShowDropDown] = useState(false);
    const [dropDownTitle, setDropDownTitle] = useState('Enter Postal Code')
    const { geoError, postalCode, setPostalCode, source, loading } = useUserLocation();

    useEffect(() => {
        if(source === 'postalCode'){
            setDropDownTitle('Postal Code Set!');
        } else{
            setDropDownTitle('Enter Postal Code');
        }
    }, [source])


    return (
        <Navbar bg="dark" expand="lg" className="p-2">
            <Navbar.Brand href="#" className="text-white">Vancity Happy Hour</Navbar.Brand>
            
            <Nav className="ms-auto">
                {/* Dropdown for Postal Code */}
                <NavDropdown 
                    title={dropDownTitle}
                    align="end" 
                    className="custom-dropdown" 
                    show={showDropDown}
                    onClick={() => setShowDropDown(true)}
                    onMouseEnter={() => setShowDropDown(true)}
                    onMouseLeave={() => setShowDropDown(false)}
                    >
                    <NavDropdown.Item 
                        style={{ minWidth: "250px", padding: "10px" }} 
                        className="custom-dropdown-item"
                        onClick={(e) => e.stopPropagation()} //prevents default behavior
                        >
                        <Form.Group controlId="postalCodeInput">
                            <Form.Label style={{ fontSize: "0.85rem" }} className="custom-dropdown-label">Enter Postal Code:</Form.Label>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="A1A1A1"
                                value={postalCode}
                                maxLength={6}
                                onChange={(e) => setPostalCode(e.target.value)}
                                style={{ fontSize: "0.85rem", padding: "5px" }}
                                className="custom-dropdown-input"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </Form.Group>
                        {geoError && <p style={{ color: "red", fontSize: "0.8rem" }}>{geoError}</p>}
                        {loading && (
                            <p style={{ color: "blue" }}>
                                Loading<span className="dots"></span>
                            </p>
                        )}
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            
        </Navbar>
    );
};

export default NavBar;
