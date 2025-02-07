import {  Container, Modal } from "react-bootstrap";
import { Restaurant } from "../../types/Restaurant";
import RadioButtonGroup from "./RadioButtonGroup";
import HappyHourPage from "./HappyHourPage";
import { SetStateAction, useState } from "react";
import DailySpecialsPage from "./DailySpecialsPage";
import BusinessHours from "./BusinessHours";



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


    if (selectedRestaurant !== null) {
        return (
            <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen={true} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRestaurant.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <p>Address: {selectedRestaurant.address}, {selectedRestaurant.city}, {selectedRestaurant.province}</p>
                        <p>Website: <a href={selectedRestaurant.url} target="_blank">{selectedRestaurant.url}</a></p>
                        <BusinessHours selectedRestaurant={selectedRestaurant}></BusinessHours>
                        {hasBothTypesDeals && 
                            <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                        }
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