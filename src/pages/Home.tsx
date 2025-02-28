import { useEffect, useState } from "react";
import MainBody from "../components/MainBody"
import { useRestaurants } from "../hooks/useRestaurant";
import { Restaurant } from "../types/Restaurant";
import { isValidCanadianPostalCode, formatPostalCode } from "../utils/postalCodeUtils";

const Home = () => {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const { data, isLoading, error } = useRestaurants();
    const [orderBy, setOrderBy] = useState("A-Z");
    const [userLocation, setUserLocation] = useState<{lat: number; lng: number } | null>(null);
    const [postalCode, setPostalCode] = useState("");
    const [geoError, setGeoError] = useState<string | null>(null);

    useEffect(() => {
        if(data && data.length > 0) {
            setRestaurants(data);
            setFilteredRestaurants(sortBy(orderBy, data));
        }   
    }, [data])

    function fetchGeoLocation() {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude, " , ", position.coords.longitude);
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser");
        }
    }

    // Get current location of user
    useEffect(() => {
        if (postalCode.length >= 6) {
            if (isValidCanadianPostalCode(postalCode)) {
                let formattedPostalCode = formatPostalCode(postalCode);
                fetch(`https://geocoder.ca/?postal=${formattedPostalCode}&json=1`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.latt && data.longt) {
                            console.log("Geocoder.ca:", data.latt, data.longt);
                            setUserLocation({ lat: parseFloat(data.latt), lng: parseFloat(data.longt) });
                            setGeoError(null); // Clear any previous errors
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
                    });
            } else {
                console.error("Invalid postal code format");
                setGeoError("Invalid postal code format. Use A1A 1A1.");
            }
        } else if (postalCode.length === 0) {
            fetchGeoLocation();
            setGeoError(null);
        }
    }, [postalCode]);

    useEffect(() => {
        if(orderBy === 'Nearest'){
            const restaurantsCopy: Restaurant[] = sortBy(orderBy, filteredRestaurants);
            setFilteredRestaurants(restaurantsCopy);
        }
    }, [userLocation])

    //When orderBy changes apply the sorts
    useEffect(() => {
        if(filteredRestaurants.length > 0){
            setFilteredRestaurants(sortBy(orderBy, filteredRestaurants));
        }
        

    }, [orderBy]);

    function sortBy(sortString: string, restaurants: Restaurant[]): Restaurant[]{
        if(sortString === 'A-Z'){ return sortByAZ(restaurants) }
        if(sortString === 'Nearest'){ return sortByNearest(restaurants) }
        if(sortString === 'Cheapest Beer'){ return sortByCheapestBeer(restaurants) }
        if(sortString === 'Cheapest Wine'){ return sortByCheapestWine(restaurants) }
        if(sortString === 'Cheapest Cider'){ return sortByCheapestCider(restaurants) }
        if(sortString === 'Cheapest Cocktail'){ return sortByCheapestCocktail(restaurants) }
        return restaurants;
    }

    function sortByAZ(restaurants: Restaurant[]): Restaurant[]{
        const sorted = [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
        return sorted;
    }

    function sortByNearest(restaurants: Restaurant[]): Restaurant[]{
        if(!userLocation) return restaurants;

        return [...restaurants].sort((a,b) => {
            const distanceA = getDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
            const distanceB = getDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
            return distanceA - distanceB;
        })
    }

    function sortByCheapestBeer(restaurants: Restaurant[]): Restaurant[]{
        return [...restaurants].sort((a,b) => {
            const priceA = a.cheapestPrices?.Beer ?? Number.MAX_VALUE;
            const priceB = b.cheapestPrices?.Beer ?? Number.MAX_VALUE;
            return priceA - priceB
        })
    }

    function sortByCheapestWine(restaurants: Restaurant[]): Restaurant[]{
        return [...restaurants].sort((a,b) => {
            const priceA = a.cheapestPrices?.Wine ?? Number.MAX_VALUE;
            const priceB = b.cheapestPrices?.Wine ?? Number.MAX_VALUE;
            return priceA - priceB
        })
    }

    function sortByCheapestCider(restaurants: Restaurant[]): Restaurant[]{
        return [...restaurants].sort((a,b) => {
            const priceA = a.cheapestPrices?.Cider ?? Number.MAX_VALUE;
            const priceB = b.cheapestPrices?.Cider ?? Number.MAX_VALUE;
            return priceA - priceB
        })
    }

    function sortByCheapestCocktail(restaurants: Restaurant[]): Restaurant[]{
        return [...restaurants].sort((a,b) => {
            const priceA = a.cheapestPrices?.Cocktail ?? Number.MAX_VALUE;
            const priceB = b.cheapestPrices?.Cocktail ?? Number.MAX_VALUE;
            return priceA - priceB
        })
    }

    //calculates distance between two points with coordinates
    function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lng2 - lng1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    if (isLoading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Failed to get!</p>;
    }

    return (
        <div>
            {restaurants.length > 0 && (
            <MainBody geoError={geoError} postalCode={postalCode} setPostalCode={setPostalCode} sortBy={sortBy} orderBy={orderBy} setOrderBy={setOrderBy} restaurants={restaurants} filteredRestaurants={filteredRestaurants} setFilteredRestaurants={setFilteredRestaurants}/>
        )}
        </div>
    );
};

export default Home;