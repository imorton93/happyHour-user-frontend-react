import { useEffect, useState } from "react";
import { useUserLocation } from "../context/UserLocationProvider";



function LocationSource(){
        const { source } = useUserLocation();
        const [sourceText, setSourceText] = useState("Current location off");
        const [colorStyle, setColorStyle] = useState('red');
    
        useEffect(() => {
            if(source === 'postalCode'){
                setSourceText('Using postal code for location.');
                setColorStyle('green');
            } else if(source === 'Geolocation'){
                setSourceText('Using browser geolocation.');
                setColorStyle('blue');
            } else{
                setSourceText('Current location off')
                setColorStyle('red');
            }
        }, [source])
    
    return (
        <div>
            <small className="d-block text-start">*Input postal code for better location accuracy on desktop.</small>
            <p className="d-block text-start" style={{ color: colorStyle, fontSize: "0.8rem" }}>{sourceText}</p>                     
        </div>
    )
    

}

export default LocationSource;