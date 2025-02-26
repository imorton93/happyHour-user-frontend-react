import {  Col, Container, Modal, Row } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import RadioButtonGroup from "./RadioButtonGroup";
import HappyHourPage from "./HappyHourPage";
import { useEffect, useState } from "react";
import DailySpecialsPage from "./DailySpecialsPage";
import BusinessHours from "./BusinessHours";
import './DetailWindow.css';



function DetailWindow({ 
        selectedRestaurant,
        showModal,
        setShowModal,
    }:
    {
        selectedRestaurant : Restaurant | null;
        showModal : boolean;
        setShowModal : React.Dispatch<React.SetStateAction<boolean>>
    }
    ){
    //selectedOption used for Radio Buttons, if the user is looking at Happy Hour or Daily Specials
    const [selectedOption, setSelectedOption] = useState<string>("Happy Hour");
    const hasBothTypesDeals = selectedRestaurant?.deals.happyHour.hasDeals && selectedRestaurant?.deals.dailySpecials.hasDeals ? true : false;

    useEffect(() => {
        if(selectedRestaurant?.deals.happyHour.hasDeals){
            setSelectedOption("Happy Hour");
        } else{
            setSelectedOption("Daily Specials");
        }
    }, [showModal])



    if (selectedRestaurant !== null) {
        return (
            <Modal className="custom-modal" show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-modal-dialog" centered>
                <Modal.Body>
                    {/* close button  */}
                    <button className="modal-close-btn" onClick={() => setShowModal(false)}>&times;</button>


                    <Container>
                        <h1 className="modal-title">{selectedRestaurant.name}</h1>
                        <hr className="custom-hr"/>
                        <Row>
                            <Col>
                                <p>Address: {selectedRestaurant.address}, {selectedRestaurant.city}, {selectedRestaurant.province}</p>
                            </Col>
                            <Col>
                                <p>Website: <a href={selectedRestaurant.url} target="_blank" className="modal-link">{selectedRestaurant.url}</a></p>
                            </Col>
                        </Row>
                        <BusinessHours selectedRestaurant={selectedRestaurant}></BusinessHours>
                        {hasBothTypesDeals && 
                            <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                        }
                    <hr className="custom-hr"/>
                    </Container>
                    {selectedOption === "Happy Hour" && 
                        <HappyHourPage selectedRestaurant={selectedRestaurant}/>
                    }
                    {selectedOption === "Daily Specials" &&
                        <DailySpecialsPage selectedRestaurant={selectedRestaurant}/>
                    }
                </Modal.Body>
            </Modal>
        )
    } else{
        return(
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>No restaurant selected!</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
        
}

export default DetailWindow;