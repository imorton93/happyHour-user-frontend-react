export interface Restaurant {
    place_id: string;
    name: string;
    address: string;
    url: string;
    city: string;
    province: string;
    latitude: number;
    longitude: number;
    categories: string[];
    business_hours: {
        day: number;
        end: string;
        start: string;
    }[];
    deals:{
        happyHour:{
            hasDeals: boolean;
            url?: string;
            times:{
                allDay: boolean;
                from: string;
                to: string;
                description: string;
                days: number[];
            }[];
            drinks:{
                name: string;
                price: number;
                type: string;
                description: string;
            }[];
            food:{
                name: string;
                price: number;
                description: string;
            }[];
        };
        dailySpecials:{
            hasDeals: boolean;
            days:{
                day: number;
                hasDeals: boolean;
                times:{
                    allDay: boolean;
                    from: string;
                    to: string;
                    description?: string
                }[];
                drinks:{
                    name: string;
                    price: number;
                    type: string;
                    description: string;
                }[];
                food:{
                    name: string;
                    price: number;
                    description: string;
                }[];
            }[];
        };
    };

    // Computed Fields 
    cheapestPrices?: Record<string, number>
}