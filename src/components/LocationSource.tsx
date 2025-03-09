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
        <div className="py-2">
            <p className="d-block text-start my-0 py-0" style={{ color: colorStyle }}>{sourceText}</p>
            <small className="d-block text-start pt-0 mt-0" style={{ fontSize: "0.8rem" }}>*Input postal code for better location accuracy on desktop.</small>                   
        </div>
    )
    

}

export default LocationSource;