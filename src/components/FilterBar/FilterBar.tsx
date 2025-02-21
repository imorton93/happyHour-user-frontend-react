
import { useState } from 'react';
import FilterHeader from './FilterHeader';
import DrinksType from './DrinksType';
import DrinkPrice from './DrinkPrice';
import FoodPrice from './FoodPrice';
import HappyHourAvailability from './HappyHourAvailability';
import { FilterObject  } from '../../types/FilterObject';
import DailySpecialsAvailability from './DailySpecialsAvailability';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

function dollarsToCents(amount: number): number {
    return Math.round(amount * 100);
}


function FilterBar({ handleFilterChange, filterView, setFilterView }:
    {
        handleFilterChange: (newFilters: FilterObject) => void;
        filterView: boolean;
        setFilterView: React.Dispatch<React.SetStateAction<boolean>>;
    }
) {
    const [badgeCount, setBadgeCount] = useState(0);
    const [maxDrinkPrice, setMaxDrinkPrice] = useState<number | undefined>();
    const [maxFoodPrice, setMaxFoodPrice] = useState<number | undefined>();
    const [discountWine, setDiscountWine] = useState(false);
    const [availableNow_HappyHour, setAvailableNow_HappyHour] = useState(false);
    const [selectedDay_HappyHour, setSelectedDay_HappyHour] = useState("");
    const [selectedTime_HappyHour, setSelectedTime_HappyHour] = useState("");
    const [availableToday_DailySpecials, setAvailableToday_DailySpecials] = useState(false);
    const [selectedDay_DailySpecials, setSelectedDay_DailySpecials] = useState("");
    const [showValidation_HappyHourAvailability, setShowValidation_HappyHourAvailability] = useState(false);
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
        setDrinkTypes(drinkTypes.map((item) => {return {...item, isChecked:false}}))

        //send empty filter object to reset filters
        handleFilterChange({});
    }

    function createFilters() : FilterObject{
        let newFilters: FilterObject = {};

        if(maxDrinkPrice !== undefined){ newFilters['maxDrinkPrice'] = dollarsToCents(maxDrinkPrice) }

        if(maxFoodPrice !== undefined){ newFilters['maxFoodPrice'] = dollarsToCents(maxFoodPrice) }

        if(discountWine !== false){ newFilters['discountWine'] = true }

        if(availableNow_HappyHour !== false){ newFilters['availableNow_HappyHour'] = true }

        //both selectedDay and selectTime need to be set for valid filter
        if(selectedDay_HappyHour !== "" && selectedTime_HappyHour !== ""){ 
            newFilters['selectedDay_HappyHour'] = selectedDay_HappyHour;
            newFilters['selectedTime_HappyHour'] = selectedTime_HappyHour
        }

        if(availableToday_DailySpecials !== false){ newFilters['availableToday_DailySpecials'] = availableToday_DailySpecials }

        if(selectedDay_DailySpecials !== ""){ newFilters['selectedDay_DailySpecials'] = selectedDay_DailySpecials }

        drinkTypes.forEach((item) => {
            if(item.isChecked){
                newFilters[item.name] = true;
            }
        })

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

        <Modal show={filterView} onHide={() => setFilterView(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            {/* <div className="filter-menu border-2 rounded-bottom mr-0 filter-bar"  style={{ maxWidth: '18rem'}}>
                <FilterHeader badgeCount={badgeCount} clearFilter={clearFilter} applyFilter={applyFilter}></FilterHeader>
                <HappyHourAvailability 
                    availableNow={availableNow_HappyHour} 
                    selectedDay={selectedDay_HappyHour} 
                    selectedTime={selectedTime_HappyHour}
                    showValidation={showValidation_HappyHourAvailability} 
                    setAvailableNow={setAvailableNow_HappyHour} 
                    setSelectedDay={setSelectedDay_HappyHour} 
                    setSelectedTime={setSelectedTime_HappyHour}>
                </HappyHourAvailability>
                <DailySpecialsAvailability
                    availableToday_DailySpecials={availableToday_DailySpecials}
                    selectedDay_DailySpecials={selectedDay_DailySpecials}
                    setAvailableToday_DailySpecials={setAvailableToday_DailySpecials}
                    setSelectedDay_DailySpecials={setSelectedDay_DailySpecials}
                    >
                </DailySpecialsAvailability>
                <DrinksType drinkTypes={drinkTypes} setDrinkTypes={setDrinkTypes}></DrinksType>
                <DrinkPrice 
                    maxPrice={maxDrinkPrice} 
                    discountWine={discountWine}
                    setMaxDrinkPrice={setMaxDrinkPrice}
                    setDiscountWine={setDiscountWine}>
                    
                </DrinkPrice>
                <FoodPrice 
                    maxPrice={maxFoodPrice}
                    setMaxFoodPrice={setMaxFoodPrice}>
                </FoodPrice>
                
            </div> */}
            <Modal.Body>
            <Form>
                <HappyHourAvailability 
                    availableNow={availableNow_HappyHour} 
                    selectedDay={selectedDay_HappyHour} 
                    selectedTime={selectedTime_HappyHour}
                    showValidation={showValidation_HappyHourAvailability} 
                    setAvailableNow={setAvailableNow_HappyHour} 
                    setSelectedDay={setSelectedDay_HappyHour} 
                    setSelectedTime={setSelectedTime_HappyHour}>
                </HappyHourAvailability>

                <DailySpecialsAvailability
                    availableToday_DailySpecials={availableToday_DailySpecials}
                    selectedDay_DailySpecials={selectedDay_DailySpecials}
                    setAvailableToday_DailySpecials={setAvailableToday_DailySpecials}
                    setSelectedDay_DailySpecials={setSelectedDay_DailySpecials}>
                </DailySpecialsAvailability>

                <DrinksType drinkTypes={drinkTypes} setDrinkTypes={setDrinkTypes}></DrinksType>

                <DrinkPrice 
                    maxPrice={maxDrinkPrice} 
                    discountWine={discountWine}
                    setMaxDrinkPrice={setMaxDrinkPrice}
                    setDiscountWine={setDiscountWine}>
                    
                </DrinkPrice>

                <FoodPrice 
                    maxPrice={maxFoodPrice}
                    setMaxFoodPrice={setMaxFoodPrice}>
                </FoodPrice>
                
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