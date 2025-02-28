import { Restaurant } from "../types/Restaurant";


export function hasDrinkType(type: string, restaurant: Restaurant) : boolean{
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



export function hasDiscountWine(restaurant: Restaurant) : boolean {
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



export function getMinDrinkPrice(restaurant: Restaurant): number{
    let min = Number.MAX_VALUE;
    if(restaurant.deals.happyHour.hasDeals){
        restaurant.deals.happyHour.drinks.forEach((drink) => {
            if(drink.price < min){
                min = drink.price;
            }
        })
    }
    return min;

}