import { Col, Container, Row } from "react-bootstrap";
import FilterBar from "./FilterBar/FilterBar";
import ListContainer from "./ListContainer";
import OrderBy from "./OrderBy";
import { Restaurant } from "../types/Restaurant";
import { useState } from "react";
import { FilterObject } from "../types/FilterObject";

const MainBody = ({ 
        restaurants,
    }:
    {
        restaurants: Restaurant[];
    }) => {

    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<FilterObject[]>([]);


    function handleFilterChange(newFilters: FilterObject[]){
        setFilters(newFilters);
        //filterData(newFilters);
    }

    function filterMinPrice(minPrice: any, restaurants: Restaurant[]): Restaurant[]{
        return restaurants.filter(restaurant => {

        });
    }



    function filterData(newFilters: FilterObject[]){
        let restaurantsCopy: Restaurant[] = [...restaurants];
        Object.keys(newFilters).forEach((key) => {
            switch (key) {
                case "minDrinkPrice":
                    //restaurantsCopy = filterMinPrice(newFilters[key], restaurantsCopy);
                    break;
                case "maxDrinkPrice":
                    console.log("Filter by Max Drink Price:");
                    break;
                case "minFoodPrice":
                    console.log("Filter by Min Food Price:");
                    break;
                case "maxFoodPrice":
                    console.log("Filter by Max Food Price:");
                    break;
                case "discountWine":
                    console.log("Filter by Discount Wine:");
                    break;
                case "availableNow":
                    console.log("Filter by Availability:");
                    break;
                case "selectedDay":
                    console.log("Filter by Selected Day:");
                    break;
                case "selectedTime":
                    console.log("Filter by Selected Time:");
                    break;
                case "Beer":
                case "Spirit":
                case "Cocktail":
                case "Cider":
                    console.log(`Filter by ${key} Type:`);
                    break;
                default:
                    console.warn(`Unknown filter key: ${key}`);
                    break;
            }
        })
    }


    return (
        <Container style={{ height: '100%'}}>

            <h2 className="mb-3">Vancity Happy Hour</h2>
            <Row>
                <OrderBy/>
            </Row>
            <Row style={{ height: '100%'}}>
                <Col style={{ height: '100%'}} xs={12} md={3}>
                    <FilterBar handleFilterChange={handleFilterChange}/>
                </Col>
                <Col style={{ height: '100%'}} xs={12} md={9}>
                    <ListContainer restaurants={restaurants} />
                </Col>
            </Row>
            
            
            

        </Container>
    );
}

export default MainBody;