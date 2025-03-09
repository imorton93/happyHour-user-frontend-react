import { useEffect, useState } from "react";
import { Navbar, Nav, Form, Offcanvas } from "react-bootstrap";
import './Navbar.css'
import { useUserLocation } from "../../context/UserLocationProvider";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function NavBar(){
    const { theme, toggleTheme } = useTheme();
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
            <Navbar bg={theme === "dark" ? "dark" : "light"} expand="lg" className="p-2">
            <Navbar.Brand href="#" className={theme === "dark" ? "text-white" : "text-dark"}>Vancity Happy Hour</Navbar.Brand>

                <Nav className="ms-auto">
                    <Nav.Link onClick={toggleTheme}>
                        <div className="icon-container">
                            {/* {theme === "dark" ? (
                                <FaSun 
                                    size={24} 
                                    color="#FFD700"
                                    className={`icon-transition ${theme === "dark" ? "rotate" : ""}`}
                                />
                            ) : (
                                <FaMoon 
                                    size={24} 
                                    color="#333"
                                    className={`icon-transition ${theme === "dark" ? "" : "rotate"}`}
                                />
                            )} */}
                            <FaSun 
                                size={24} 
                                color="#FFD700"
                                className={`icon-transition ${theme === "dark" ? "scale-out" : "scale-in"}`}
                            />
                            <FaMoon 
                                size={24} 
                                color="#333"
                                className={`icon-transition ${theme === "dark" ? "scale-in" : "scale-out"}`}
                            />

                        </div>


                    </Nav.Link>
                </Nav>

                <Nav className="ms-auto">
                   <Nav.Link className={theme === "dark" ? "text-white" : "text-dark"} onClick={() => setShowSidebar(true)}>{title}</Nav.Link>
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
