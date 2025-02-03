import { useRestaurants } from "../hooks/useRestaurant";

const MainBody = () => {
    const { data, isLoading, error } = useRestaurants();
    console.log(data);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Failed to get!</p>

    return (
        <>
            <h1>Response:</h1>
            <ul>
                {data?.map((restaurant: { name: string }) => (
                    <li key={ restaurant.name }>{restaurant.name}</li>
                ))}
            </ul>

        </>
    );
}

export default MainBody;