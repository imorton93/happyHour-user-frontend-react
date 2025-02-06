import { useEffect, useState } from "react";
import MainBody from "../components/MainBody"
import { useRestaurants } from "../hooks/useRestaurant";
import { Restaurant } from "../types/Restaurant";

const Home = () => {

    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const { data, isLoading, error } = useRestaurants();

    useEffect(() => {
        if(data) {
            setRestaurants(data);
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
            
            <MainBody restaurants={restaurants}/>    
        </div>
    );
};

export default Home;