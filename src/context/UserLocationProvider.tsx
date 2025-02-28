import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { formatPostalCode, isValidCanadianPostalCode } from "../utils/postalCodeUtils";

interface UserLocationContextType {
    userLocation: { lat: number; lng: number} | null;
    postalCode: string;
    setPostalCode: (code: string) => void;
    geoError: string | null;
    source: string | null;
    loading: boolean;
}


const UserLocationContext= createContext<UserLocationContextType | undefined>(undefined);


export function UserLocationProvider({ children }: { children: ReactNode}) {
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [postalCode, setPostalCode] = useState("");
    const [geoError, setGeoError] = useState<string | null>(null);
    const [source, setSource] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function fetchGeoLocation() {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude, " , ", position.coords.longitude);
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setSource('Geolocation');
                },
                (error) => {
                    console.error("Geolocation is not supported by this browser");
                    setGeoError("Geolocation is not supported.");
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser");
            setSource("");
            setGeoError("Geolocation is not supported.")
        }
    }

    useEffect(() => {
        if (postalCode.length >= 6) {
            if (isValidCanadianPostalCode(postalCode)) {
                let formattedPostalCode = formatPostalCode(postalCode);
                setLoading(true); //start loading
                fetch(`https://geocoder.ca/?postal=${formattedPostalCode}&json=1`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.latt && data.longt) {
                            console.log("Geocoder.ca:", data.latt, data.longt);
                            setUserLocation({ lat: parseFloat(data.latt), lng: parseFloat(data.longt) });
                            setGeoError(null);
                            setSource('postalCode');
                        } else {
                            console.error("Invalid postal code response from API");
                            setGeoError("Invalid postal code. Please check and try again.");
                            fetchGeoLocation();
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching geolocation from API.", error);
                        setGeoError("Failed to get location. Falling back to auto-location.");
                        fetchGeoLocation();
                    })
                    .finally(() => {
                        setLoading(false);
                    })
            } else {
                setGeoError("Invalid postal code format.");
            }
        } else if (postalCode.length === 0) {
            fetchGeoLocation();
            setGeoError(null);
        } else {
            fetchGeoLocation();
        }
    }, [postalCode]);

    return (
        <UserLocationContext.Provider value={{ userLocation, postalCode, setPostalCode, geoError, source, loading }}>
            {children}
        </UserLocationContext.Provider>
    );

}


export function useUserLocation() {
    const context = useContext(UserLocationContext);
    if(!context) {
        throw new Error("useUserLocation must be used within a UserLocationProvider");
    }
    return context;
}