import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import FilterBar from "./FilterBar/FilterBar";
import ListContainer from "./ListContainer";
import ButtonControls from "./ButtonControls";
import { Restaurant } from "../types/Restaurant";
import { useState } from "react";
import { FilterObject } from "../types/FilterObject";
import MapView from "./MapView";
import FilterModal from "./FilterModal";
import { BiSearch } from "react-icons/bi";

const MainBody = ({ 
        restaurants,
        filteredRestaurants,
        setFilteredRestaurants,
    }:
    {
        restaurants: Restaurant[];
        filteredRestaurants: Restaurant[];
        setFilteredRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>
    }) => {

    
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterObject>({});
    const [orderBy, setOrderBy] = useState("alpha");
    const [mapView, setMapView] = useState(false);
    const [filterView, setFilterView] = useState(false);

    
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
        //sets filters in useState
        setFilters(newFilters);
        //calls function to filter the restaurants
        filterData(newFilters);
    }

    function getMaxDrinkPrice(restaurant: Restaurant) : number{
        let max = 0;
        if(restaurant.deals.happyHour.hasDeals){
            restaurant.deals.happyHour.drinks.forEach((drink) => {
                if(drink.price > max){
                    max = drink.price;
                }
            })
        }
        return max;
    }

    function filterMinDrinkPrice(minPrice: any, restaurants: Restaurant[]): Restaurant[]{

        return restaurants.filter(restaurant => {
            return minPrice <= getMaxDrinkPrice(restaurant);
        });
    }

    function getMinDrinkPrice(restaurant: Restaurant): number{
        let min = 9999999;
        if(restaurant.deals.happyHour.hasDeals){
            restaurant.deals.happyHour.drinks.forEach((drink) => {
                if(drink.price < min){
                    min = drink.price;
                }
            })
        }
        return min;

    }

    function filterMaxDrinkPrice(maxPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return maxPrice >= getMinDrinkPrice(restaurant);
        })
    }

    function getMaxFoodPrice(restaurant: Restaurant) : number {
        let max = 0;
        if(restaurant.deals.happyHour.hasDeals){
            restaurant.deals.happyHour.food.forEach((food) => {
                if(food.price > max){
                    max = food.price;
                }
            })
        }
        return max;
    }

    function filterMinFoodPrice(minPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return minPrice <= getMaxFoodPrice(restaurant);
        })
    }

    //Gets the minimum food price for that restaurants happy hour
    function getMinFoodPrice(restaurant: Restaurant) : number {
        let min = 9999999;
        if(restaurant.deals.happyHour.hasDeals){
            restaurant.deals.happyHour.food.forEach((food) => {
                if(food.price < min){
                    min = food.price;
                }
            })
        }
        return min;
    }

    function filterMaxFoodPrice(maxPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return maxPrice >= getMinFoodPrice(restaurant);
        })
    }

    function hasDiscountWine(restaurant: Restaurant) : boolean {
        let returnVal = false;
        if(restaurant.deals.happyHour.hasDeals){
            for(let i = 0; i < restaurant.deals.happyHour.drinks.length; i++){
                let drink = restaurant.deals.happyHour.drinks[i];
                let name = drink.name.toLowerCase();
                if(drink.type === "Wine" && name.includes('off')){
                    returnVal = true;
                    break;
                }
            }
        }
        if(!returnVal && restaurant.deals.dailySpecials.hasDeals){
            for(let i = 0; i < restaurant.deals.dailySpecials.days.length; i++){
                let day = restaurant.deals.dailySpecials.days[i];
                if(day.hasDeals){
                    for(let j = 0; j < day.drinks.length; j++){
                        let name = day.drinks[j].name;
                        if(day.drinks[j].type === "Wine" && name.includes('off')){
                            returnVal = true;
                            break;
                        }
                    }
                    if(returnVal){
                        break;
                    }
                }
            }
        }
        return returnVal;
    }

    function filterDiscountWine(restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return hasDiscountWine(restaurant);
        })
    }

    function hasDrinkType(type: string, restaurant: Restaurant) : boolean{
        let returnVal = false;
        if(restaurant.deals.happyHour.hasDeals){
            for(let i = 0; i < restaurant.deals.happyHour.drinks.length; i++){
                let drink = restaurant.deals.happyHour.drinks[i];
                if(drink.type === type){
                    returnVal = true;
                    break;
                }
            }
        }
        if(!returnVal && restaurant.deals.dailySpecials.hasDeals){
            for(let i = 0; i < restaurant.deals.dailySpecials.days.length; i++){
                let day = restaurant.deals.dailySpecials.days[i];
                if(day.hasDeals){
                    for(let j = 0; j < day.drinks.length; j++){
                        if(day.drinks[j].type === type){
                            returnVal = true;
                            break;
                        }
                    }
                    if(returnVal){
                        break;
                    }
                }
            }
        }
        return returnVal;
    }

    function filterByDrinkType(type: string ,restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {
            return hasDrinkType(type, restaurant)
        })
    }

    //takes in a string with the time forma "hh:mm" and returns a number of minutes
   function timeToMinutes(time: string): number {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
   }

   //function takes in there strings in time form "hh:mm"
   // returns a boolean based on if the targe falls between the start and the end
   function isTimeInRange(target: string, start: string, end: string): boolean {
        const targetMinutes = timeToMinutes(target);
        const startMinutes = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);
    
        if (startMinutes <= endMinutes) {
            // Normal case: range does NOT cross midnight
            return targetMinutes >= startMinutes && targetMinutes <= endMinutes;
        } else {
            // Special case: range crosses midnight (e.g., 23:00 - 02:00)
            return targetMinutes >= startMinutes || targetMinutes <= endMinutes;
        }
    }


    //Takes in a string in the form of 1430 or 0100, which represents a time
    //returns a string in time format of 14:30 or 01:00
    //yelp fusion has times in 1340 format by default so need to convert
    function convertToTimeFormatStr(time: string): string{
        let returnString = time;
        returnString = returnString.substring(0,returnString.length-2) + ":" + returnString.substring(returnString.length-2);
        return returnString;
    }

    //returns true if restaurant is open now
    function isOpenNow(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
        let returnVal = false;
        let businessHours = restaurant.business_hours;
        for (let i = 0; i < businessHours.length; i++){
            //checks if the right day of the week
            if(weekday === businessHours[i].day){
                let startTime = convertToTimeFormatStr(businessHours[i].start);
                let endTime = convertToTimeFormatStr(businessHours[i].end);
                //checks if in time range
                if(isTimeInRange(currentTime, startTime, endTime)){
                    returnVal = true;
                    break;
                }
            }
        }
        return returnVal;
    }

    


    function hasHappyHourGivenDayAndTime(restaurant: Restaurant, weekday: number, currentTime: string): boolean{
        let returnVal = false;
        //check if the restaurant is open now
        if(isOpenNow(restaurant, weekday, currentTime)){
            //checks if restaurant has happy hour
            if(restaurant.deals.happyHour.hasDeals){
                //loop through all the times for happy hour
                restaurant.deals.happyHour.times.forEach((hours) => {
                    //checks if the times include today
                    if(hours.days.includes(weekday)){
                        //if the happy hour goes till close will put in 6am or "06:00"
                        //already know that the business is open so just need to make sure past the start time
                        if(hours.to === ""){
                            if(isTimeInRange(currentTime, hours.from, "06:00")){
                                returnVal = true;
                            }
                        }else{
                            if(isTimeInRange(currentTime, hours.from, hours.to)){
                                returnVal = true;
                            }
                        }
                    }
                })
            }
        }
        return returnVal;
    }

    function filterAvailableNowHappyHour(restaurants: Restaurant[]){
        const now = new Date();
        //returns a value from 0-6, 0 -> Sunday  1 -> Monday
        const weekday = now.getDay();
        //gets current time in 24 hour format ex. "14:30"
        const currentTime = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false});
        
        return restaurants.filter((restaurant) => {
            return hasHappyHourGivenDayAndTime(restaurant, weekday, currentTime);
        })
    }


    function hasASpecialOnGivenDay(restaurant: Restaurant, weekday: number): boolean{
        let returnVal = false;
        if(restaurant.deals.dailySpecials.hasDeals){
            restaurant.deals.dailySpecials.days.forEach((item) => {
                if(item.day === weekday && item.hasDeals){
                    returnVal = true;
                }
            })
        }
        return returnVal;
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

    //takes string of weekday and returns number
    function strWeekdayToNum(weekday: string): number{
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //get a representation of weekday as a number, 0 -> Sunday, 1 -> Monday
        return weekdays.indexOf(weekday);
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

    function filterData(newFilters: FilterObject){
        let restaurantsCopy: Restaurant[] = [...restaurants];
        Object.keys(newFilters).forEach((key) => {
            switch (key) {
                case "minDrinkPrice":
                    restaurantsCopy = filterMinDrinkPrice(newFilters[key], restaurantsCopy);
                    break;
                case "maxDrinkPrice":
                    restaurantsCopy = filterMaxDrinkPrice(newFilters[key], restaurantsCopy);
                    break;
                case "minFoodPrice":
                    restaurantsCopy = filterMinFoodPrice(newFilters[key], restaurantsCopy);
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
        setFilteredRestaurants(restaurantsCopy);
    }


    return (
        <Container style={{ height: '100%'}}>

            <h2 className="mb-3">Vancity Happy Hour</h2>

            <Row>
                <Col style={{ height: '100%'}} xs={12} md={3}>
                    
                </Col>
                <Col style={{ height: '100%'}} xs={12} md={9}>
                    <Form.Group controlId="searchKeyword" className=" mt-2 mb-2">
                    <InputGroup className="search-bar">
                        <InputGroup.Text>
                        <BiSearch size={20} />
                        </InputGroup.Text>
                        <Form.Control
                        type="text"
                        placeholder="Search by keyword..."
                        />
                    </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col style={{ height: '100%'}} xs={12} md={3}>
                    
                </Col>
                <Col style={{ height: '100%'}} xs={12} md={9}>
                    <ButtonControls mapView={mapView} toggleMapView={toggleMapView} toggleFilterView={toggleFilterView}/>
                </Col>
                
                   
                
                
            </Row>
            <Row style={{ height: '100%'}}>
                <Col style={{ height: '100%'}} xs={12} md={3}>
                    
                </Col>
                <Col style={{ height: '100%'}} xs={12} md={9}>
                    {mapView ? (
                        <MapView restaurants={filteredRestaurants}></MapView>
                    ) : (
                        <ListContainer restaurants={filteredRestaurants} />
                    )}
                    
                </Col>
            </Row>
            
            <FilterBar filterView={filterView} setFilterView={setFilterView} handleFilterChange={handleFilterChange}/>
        </Container>
    );
}

export default MainBody;