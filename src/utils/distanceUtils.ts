export function isWithinDistance(maxDistance: number, userLat: number | undefined, userLng: number | undefined, restaurantLat: number, restaurantLng: number): boolean{
    if(userLat === undefined || userLng === undefined) return false;

    const distance = calculateDistance(userLat, userLng, restaurantLat, restaurantLng);
    return distance <= maxDistance;
}


//Returns a distance in km between two points
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number{
    const R = 6371;
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}