import { Container, Row } from "react-bootstrap";
import FilterBar from "./FilterBar/FilterBar";
import ListContainer from "./ListContainer";
import ButtonControls from "./ButtonControls";
import { Restaurant } from "../types/Restaurant";
import { useEffect, useState } from "react";
import { FilterObject } from "../types/FilterObject";
import MapView from "./MapView/MapView";
import SearchBar from "./SearchBar";
import { hasHappyHourGivenDayAndTime } from "../utils/happyHourUtils";
import { hasASpecialOnGivenDay } from "../utils/specialsUtils";
import { isTimeInRange } from "../utils/timesUtils";
import { strWeekdayToNum } from "../utils/daysUtils";
import { hasDiscountWine, hasDrinkType, getMinDrinkPrice } from "../utils/drinksUtils";
import { getMinFoodPrice } from "../utils/foodUtils";

const MainBody = ({ 
        restaurants,
        filteredRestaurants,
        setFilteredRestaurants,
        orderBy,
        setOrderBy,
        sortBy,
    }:
    {
        restaurants: Restaurant[];
        filteredRestaurants: Restaurant[];
        setFilteredRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
        orderBy: string;
        setOrderBy: React.Dispatch<React.SetStateAction<string>>;
        sortBy: (sortString: string, restaurants: Restaurant[]) => Restaurant[];
    }) => {

    const [badgeCount, setBadgeCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterObject>({});
    
    const [mapView, setMapView] = useState(false);
    const [filterView, setFilterView] = useState(false);

    //When the user changes the search query
    useEffect(() => {
        handleFilterChange(filters);
        
    }, [searchQuery])
    
    //toggle Filter Modal
    function toggleFilterView(){
        setFilterView((prev) => !prev)
    }


    //toggle map view
    function toggleMapView(){
        setMapView((prev) => !prev);
    }

    //initially called by Apply button in FilterBar component
    function handleFilterChange(newFilters: FilterObject){
        //makes sure that searchQuery is kept in filters
        newFilters['searchQuery'] = searchQuery;

        //sets filters in useState
        setFilters(newFilters);

        //calls function to filter the restaurants
        filterData(newFilters);
    }

    function filterMaxDrinkPrice(maxPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return maxPrice >= getMinDrinkPrice(restaurant);
        })
    }

    function filterMaxFoodPrice(maxPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return maxPrice >= getMinFoodPrice(restaurant);
        })
    }

    function filterDiscountWine(restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return hasDiscountWine(restaurant);
        })
    }

    function filterByDrinkType(type: string ,restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return hasDrinkType(type, restaurant)
        })
    }


    function filterAvailableNowHappyHour(restaurants: Restaurant[]){
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        let weekday = now.getDay();
        //gets current time in 24 hour format ex. "14:30"
        const currentTime = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});

        //need to check if it is between midnight and 6 am the next day and the happy hour might be a late night happy hour
        //therefore day must be decremented and check the past days hours
        if(isTimeInRange(currentTime, "00:00", "06:00")){
            weekday = weekday === 0 ? 6 : weekday - 1;
        }

        return restaurants.filter((restaurant) => {
            return hasHappyHourGivenDayAndTime(restaurant, weekday, currentTime);
        })
    }


    //function is called to filter restaurants based on if they have a daily special today
    function filterSpecialsAvailableToday(restaurants: Restaurant[]): Restaurant[]{
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        const weekday = now.getDay();
        return restaurants.filter((restaurant) => {
            return hasASpecialOnGivenDay(restaurant, weekday);
        })
    }

    //filters restaurants that have deals on given day
    function filterSpecialsForDay(weekDay: string, restaurants: Restaurant[]): Restaurant[]{
        let weekdayNum = strWeekdayToNum(weekDay);
        return restaurants.filter((restaurant) => {
            return hasASpecialOnGivenDay(restaurant, weekdayNum);
        })
    }


    function filterHappyHourOnGivenDay(weekDay: string, time: string, restaurants: Restaurant[]): Restaurant[]{
        let weekdayNum = strWeekdayToNum(weekDay);

        return restaurants.filter((restaurant) => {
            return hasHappyHourGivenDayAndTime(restaurant, weekdayNum, time);
        })
    }


    function filterByRestaurantTypes(restaurantTypes: string[], restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter((restaurant) => 
            restaurantTypes.every(category => restaurant.categories.includes(category))
        );
    }

    function filterByName(searchWord: string, restaurants: Restaurant[]){
        if(searchWord !== ""){
            return restaurants.filter((restaurant) => {
                return restaurant.name.toLowerCase().includes(searchWord.toLowerCase());
            })
        } else{
            return restaurants;
        }
        
    }


    function filterData(newFilters: FilterObject){
        let restaurantsCopy: Restaurant[] = [...restaurants];
        Object.keys(newFilters).forEach((key) => {
            switch (key) {
                case "searchQuery":
                    restaurantsCopy = filterByName(newFilters[key], restaurantsCopy);
                    break;
                case "maxDrinkPrice":
                    restaurantsCopy = filterMaxDrinkPrice(newFilters[key], restaurantsCopy);
                    break;
                case "maxFoodPrice":
                    restaurantsCopy = filterMaxFoodPrice(newFilters[key], restaurantsCopy);
                    break;
                case "discountWine":
                    restaurantsCopy = filterDiscountWine(restaurantsCopy);
                    break;
                case "availableNow_HappyHour":
                    restaurantsCopy = filterAvailableNowHappyHour(restaurantsCopy);
                    break;
                case "availableToday_DailySpecials":
                    restaurantsCopy = filterSpecialsAvailableToday(restaurantsCopy);
                    break;
                case "selectedDay_DailySpecials":
                    restaurantsCopy = filterSpecialsForDay(newFilters[key], restaurantsCopy);
                    break;
                case "restaurantTypes":
                    restaurantsCopy = filterByRestaurantTypes(newFilters[key], restaurantsCopy);
                    console.log('Filter by restaurantTypes')
                    break;
                case "selectedDay_HappyHour":
                    restaurantsCopy = filterHappyHourOnGivenDay(newFilters[key], newFilters["selectedTime_HappyHour"], restaurantsCopy);
                    console.log("selected day Happy hour and selected time happy hour filter");
                    break;
                case "Beer":
                case "Spirit":
                case "Cocktail":
                case "Cider":
                    restaurantsCopy = filterByDrinkType(key ,restaurantsCopy);
                    console.log(`drink type ${key} filter`)
                    break;
                default:
                    console.warn(`Unknown filter key: ${key}`);
                    break;
            }
        })
        restaurantsCopy = sortBy(orderBy, restaurantsCopy);

        setFilteredRestaurants(restaurantsCopy);
    }


    return (
        <Container style={{ maxWidth: '800px'}}>
            <div className="filter-container" style={{ position: 'sticky', top: '0', zIndex: '1000', paddingBottom: '10px' }}>
                <Row>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                </Row>

                <Row>
                    <ButtonControls orderBy={orderBy} setOrderBy={setOrderBy} mapView={mapView} toggleMapView={toggleMapView} toggleFilterView={toggleFilterView} badgeCount={badgeCount}/>
                </Row>

                <hr className="mb-0 pb-0"/>

            </div>

            <Row style={{ minHeight: "65vh"}}>
                {mapView ? (
                        <MapView restaurants={filteredRestaurants}></MapView>
                    ) : (
                        <ListContainer restaurants={filteredRestaurants} />
                    )}
            </Row>
            
            <FilterBar restaurants={restaurants} filterView={filterView} setFilterView={setFilterView} handleFilterChange={handleFilterChange} setBadgeCount={setBadgeCount}/>
        </Container>
    );
}

export default MainBody;