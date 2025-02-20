import { useEffect, useState } from "react";
import MainBody from "../components/MainBody"
import { useRestaurants } from "../hooks/useRestaurant";
import { Restaurant } from "../types/Restaurant";
import MapView from "../components/MapView";

const Home = () => {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
    const { data, isLoading, error } = useRestaurants();

    useEffect(() => {
        if(data) {
            setRestaurants(data);
            setFilteredRestaurants(data);
        }   
    }, [data])

    if (isLoading){
        return <p>Loading...</p>;
    }

    if (error){
        return <p>Failed to get!</p>;
    }

    return (
        <div style={{ height: '100%'}}>
            <MainBody restaurants={restaurants} filteredRestaurants={filteredRestaurants} setFilteredRestaurants={setFilteredRestaurants}/>
        </div>
    );
};

export default Home;