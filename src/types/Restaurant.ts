export interface Restaurant {
    yelpid: string;
    name: string;
    address: string;
    url: string;
    city: string;
    province: string;
    deals:{
        happyHour:{
            hasDeals: boolean;
            url?: string;
            times?:{
                allDay: boolean;
                from: string;
                to: string;
                description: string;
                days: number[];
            }[];
            drinks?:{
                name: string;
                price: number;
                type: string;
                description: string;
            }[];
            food?:{
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
}