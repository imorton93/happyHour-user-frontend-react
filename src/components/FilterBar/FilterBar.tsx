
import { useState } from 'react';
import DrinksType from './DrinksType';
import DrinkPrice from './DrinkPrice';
import FoodPrice from './FoodPrice';
import HappyHourAvailability from './HappyHourAvailability';
import { FilterObject  } from '../../types/FilterObject';
import DailySpecialsAvailability from './DailySpecialsAvailability';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Restaurant } from '../../types/Restaurant';
import { useRestaurantCategories } from '../../hooks/useRestaurantCategories';
import RestaurantType from './RestaurantType';
import Proximity from './Proximity';
import { useUserLocation } from '../../context/UserLocationProvider';

function dollarsToCents(amount: number): number {
    return Math.round(amount * 100);
}


function FilterBar({ handleFilterChange, filterView, setFilterView, setBadgeCount, restaurants }:
    {
        handleFilterChange: (newFilters: FilterObject) => void;
        filterView: boolean;
        setFilterView: React.Dispatch<React.SetStateAction<boolean>>;
        setBadgeCount: React.Dispatch<React.SetStateAction<number>>;
        restaurants: Restaurant[];
    }
) {

    const { source } = useUserLocation();
    const [maxDrinkPrice, setMaxDrinkPrice] = useState<number | undefined>();
    const [maxFoodPrice, setMaxFoodPrice] = useState<number | undefined>();
    const [discountWine, setDiscountWine] = useState(false);
    const [availableNow_HappyHour, setAvailableNow_HappyHour] = useState(false);
    const [selectedDay_HappyHour, setSelectedDay_HappyHour] = useState("");
    const [selectedTime_HappyHour, setSelectedTime_HappyHour] = useState("");
    const [availableToday_DailySpecials, setAvailableToday_DailySpecials] = useState(false);
    const [selectedDay_DailySpecials, setSelectedDay_DailySpecials] = useState("");
    const [showValidation_HappyHourAvailability, setShowValidation_HappyHourAvailability] = useState(false);
    const [restaurantTypes, setRestaurantTypes] = useState<string[]>([]);
    const [distance, setDistance] = useState(12);
    const [proximityOn, setProximityOn] = useState(false);
    const [drinkTypes, setDrinkTypes]= useState([
        {
            name: "Beer",
            isChecked: false,
        },
        {
            name: "Spirit",
            isChecked: false,
        },
        {
            name: "Cocktail",
            isChecked: false,
        },
        {
            name: "Cider",
            isChecked: false,
        },
        {
            name: "Wine",
            isChecked: false,
        }
    ]);
    const categories = useRestaurantCategories(restaurants);

    function clearFilter(): undefined {
        setBadgeCount(0);
        setMaxDrinkPrice(undefined);
        setMaxFoodPrice(undefined);
        setDiscountWine(false);
        setAvailableNow_HappyHour(false);
        setSelectedDay_HappyHour("");
        setSelectedTime_HappyHour("");
        setAvailableToday_DailySpecials(false);
        setSelectedDay_DailySpecials("");
        setDrinkTypes(drinkTypes.map((item) => {return {...item, isChecked:false}}));
        setRestaurantTypes([]);
        setProximityOn(false);
        setDistance(12);

        //send empty filter object to reset filters
        handleFilterChange({});
    }


    //creates all Filter Objects to be used
    function createFilters() : FilterObject{
        let newFilters: FilterObject = {};
        //filter Count is used to update the badge
        let filterCount: number = 0;

        if(maxDrinkPrice !== undefined){ 
            newFilters['maxDrinkPrice'] = dollarsToCents(maxDrinkPrice);
            filterCount++;
        }

        if(maxFoodPrice !== undefined){ 
            newFilters['maxFoodPrice'] = dollarsToCents(maxFoodPrice);
            filterCount++;
        }

        if(discountWine !== false){ 
            newFilters['discountWine'] = true
            filterCount++;
        }

        if(availableNow_HappyHour !== false){ 
            newFilters['availableNow_HappyHour'] = true;
            filterCount++;
        }

        if(proximityOn){
            console.log('proximity set to: ', distance);
            newFilters['proximity'] = distance;
            filterCount++;
        }

        //both selectedDay and selectTime need to be set for valid filter
        if(selectedDay_HappyHour !== "" && selectedTime_HappyHour !== ""){ 
            newFilters['selectedDay_HappyHour'] = selectedDay_HappyHour;
            newFilters['selectedTime_HappyHour'] = selectedTime_HappyHour;
            filterCount++;
        }

        if(availableToday_DailySpecials !== false){ 
            newFilters['availableToday_DailySpecials'] = availableToday_DailySpecials;
            filterCount++; 
        }

        if(selectedDay_DailySpecials !== ""){ 
            newFilters['selectedDay_DailySpecials'] = selectedDay_DailySpecials;
            filterCount++; 
        }

        if(restaurantTypes.length !== 0){
            newFilters['restaurantTypes'] = restaurantTypes;
            filterCount = filterCount + restaurantTypes.length; //adds number of restaruant types to filter count
        }

        drinkTypes.forEach((item) => {
            if(item.isChecked){
                newFilters[item.name] = true;
                filterCount++;
            }
        })
        setBadgeCount(filterCount);
        return newFilters
    }


    function checkHappyHourAvailability(){
        let returnVal = true;
        let hasSelectDay = selectedDay_HappyHour !== "";
        let hasSelectTime = selectedTime_HappyHour !== "";
        //no inputs for either is valid
        if( !hasSelectDay && hasSelectTime ){
            returnVal = false;
            console.log("invalid");
            setShowValidation_HappyHourAvailability(true);
        } else if( hasSelectDay && !hasSelectTime ){
            returnVal = false;
            console.log("invalid");
            setShowValidation_HappyHourAvailability(true)
        } else{
            setShowValidation_HappyHourAvailability(false)
        }

        return returnVal;
    }


    //function is for checking inputs that need two or more fields to be filled to work
    // ex. Happy Hour Availability the user needs to select a weekday and time
    //add more if necessary
    function validateInputs(){
        let returnVal = true;
        //check happy hour availability has both weekday and time input if partially filled
        returnVal = checkHappyHourAvailability();

        return returnVal;
    }


    function applyFilter(): undefined {
        
        
        if(validateInputs()){
            //create an array of FilterObjects based on set filters
            let newFilters: FilterObject = createFilters();
            handleFilterChange(newFilters);
            setFilterView(false);
        }
        
        
    }



    return (

        <Modal className="custom-modal" show={filterView} onHide={() => setFilterView(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <HappyHourAvailability 
                    availableNow={availableNow_HappyHour} 
                    selectedDay={selectedDay_HappyHour} 
                    selectedTime={selectedTime_HappyHour}
                    showValidation={showValidation_HappyHourAvailability} 
                    setAvailableNow={setAvailableNow_HappyHour} 
                    setSelectedDay={setSelectedDay_HappyHour} 
                    setSelectedTime={setSelectedTime_HappyHour}/>

                <DailySpecialsAvailability
                    availableToday_DailySpecials={availableToday_DailySpecials}
                    selectedDay_DailySpecials={selectedDay_DailySpecials}
                    setAvailableToday_DailySpecials={setAvailableToday_DailySpecials}
                    setSelectedDay_DailySpecials={setSelectedDay_DailySpecials}/>

                <RestaurantType restaurantTypes={restaurantTypes} categories={categories} setRestaurantTypes={setRestaurantTypes}/>

                {/* condition to make sure user has some kind of location service on */}
                {source !== "" && 
                (<Proximity distance={distance} proximityOn={proximityOn} setDistance={setDistance} setProximityOn={setProximityOn}/>)
                }


                <DrinksType drinkTypes={drinkTypes} setDrinkTypes={setDrinkTypes}/>

                <DrinkPrice 
                    maxPrice={maxDrinkPrice} 
                    discountWine={discountWine}
                    setMaxDrinkPrice={setMaxDrinkPrice}
                    setDiscountWine={setDiscountWine}/>

                <FoodPrice 
                    maxPrice={maxFoodPrice}
                    setMaxFoodPrice={setMaxFoodPrice}/>
                
            </Form>


            </Modal.Body>


            <Modal.Footer>
                    <Col><Button variant="secondary" className='w-100 mb-2' onClick={clearFilter}>Clear</Button></Col>
                    <Col><Button variant="primary" className='w-100 mb-2' onClick={applyFilter}>Apply</Button></Col>
            </Modal.Footer>
        </Modal>

    )
}

export default FilterBar;