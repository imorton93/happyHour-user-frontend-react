
import { useState } from 'react';
import FilterHeader from './FilterHeader';
import DrinksType from './DrinksType';
import DrinkPrice from './DrinkPrice';
import FoodPrice from './FoodPrice';
import Availability from './Availability';
import { FilterObject  } from '../../types/FilterObject';




function FilterBar({ handleFilterChange }:
    {
        handleFilterChange: (newFilters: FilterObject[]) => void;
    }
) {
    const [badgeCount, setBadgeCount] = useState(0);
    const [minDrinkPrice, setMinDrinkPrice] = useState<number | undefined>();
    const [maxDrinkPrice, setMaxDrinkPrice] = useState<number | undefined>();
    const [minFoodPrice, setMinFoodPrice] = useState<number | undefined>();
    const [maxFoodPrice, setMaxFoodPrice] = useState<number | undefined>();
    const [discountWine, setDiscountWine] = useState(false);
    const [availableNow, setAvailableNow] = useState(false);
    const [selectedDay, setSelectedDay] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
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
        }
    ]);

    function clearFilter(): undefined {
        setBadgeCount(0);
        setMinDrinkPrice(undefined);
        setMaxDrinkPrice(undefined);
        setMinFoodPrice(undefined);
        setMaxFoodPrice(undefined);
        setDiscountWine(false);
        setAvailableNow(false);
        setSelectedDay("");
        setSelectedTime("");
        setDrinkTypes(drinkTypes.map((item) => {return {...item, isChecked:false}}))
    }

    function createFilters() : FilterObject[]{
        let newFilters: FilterObject[] = [];
        if(minDrinkPrice !== undefined){ newFilters.push({minDrinkPrice: minDrinkPrice}); }

        if(maxDrinkPrice !== undefined){ newFilters.push({maxDrinkPrice: maxDrinkPrice}); }
        
        if(minFoodPrice !== undefined){ newFilters.push({minFoodPrice: minFoodPrice})}

        if(maxFoodPrice !== undefined){ newFilters.push({maxFoodPrice: maxFoodPrice})}

        if(discountWine !== false){ newFilters.push({discountWine: true})}

        if(availableNow !== false){ newFilters.push({availableNow: true})}

        if(selectedDay !== ""){ newFilters.push({selectedDay: selectedDay})}

        if(selectedTime !== ""){ newFilters.push({selectedTime: selectedTime})}

        drinkTypes.forEach((item) => {
            if(item.isChecked){
                let newFilterObject: FilterObject = {};
                newFilterObject[item.name] = item.isChecked;
                newFilters.push(newFilterObject);
            }
        })

        return newFilters
    }


    function applyFilter(): undefined {
        //create an array of FilterObjects based on set filters
        let newFilters: FilterObject[] = createFilters();
        
        handleFilterChange(newFilters);
    }



    return (
        <div className="filter-menu border-2 rounded-bottom mr-0 filter-bar"  style={{ maxWidth: '18rem'}}>
            <FilterHeader badgeCount={badgeCount} clearFilter={clearFilter} applyFilter={applyFilter}></FilterHeader>
            <Availability 
                availableNow={availableNow} 
                selectedDay={selectedDay} 
                selectedTime={selectedTime} 
                setAvailableNow={setAvailableNow} 
                setSelectedDay={setSelectedDay} 
                setSelectedTime={setSelectedTime}>
            </Availability>
            <DrinksType drinkTypes={drinkTypes} setDrinkTypes={setDrinkTypes}></DrinksType>
            <DrinkPrice 
                minPrice={minDrinkPrice} 
                maxPrice={maxDrinkPrice} 
                discountWine={discountWine}
                setMinDrinkPrice={setMinDrinkPrice}
                setMaxDrinkPrice={setMaxDrinkPrice}
                setDiscountWine={setDiscountWine}>
                
            </DrinkPrice>
            <FoodPrice 
                minPrice={minFoodPrice} 
                maxPrice={maxFoodPrice}
                setMaxFoodPrice={setMaxFoodPrice}
                setMinFoodPrice={setMinFoodPrice}>
            </FoodPrice>
            
        </div>
    )
}

export default FilterBar;