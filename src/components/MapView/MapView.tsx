import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issue in React apps
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Container } from 'react-bootstrap';
import { Restaurant } from '../../types/Restaurant';
import { useState } from 'react';
import DetailWindow from '../DetailWindow/DetailWindow';
import MapRestaurantCard from './MapRestaurantCard';
import './Map.css'
import { useUserLocation } from '../../context/UserLocationProvider';


// Fix Leaflet marker icon issue in React
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const userIcon = new L.DivIcon({
    className: "user-location-icon",
    html: '<div class="user-dot"></div>',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
})

interface MapViewProps {
   place_id: string; name: string; lat: number; lng: number;
}

export default function MapView({ restaurants }: { restaurants: Restaurant[]}) {

    const[showModal, setShowModal] = useState(false);
    const[selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const { source, userLocation } = useUserLocation();

    let locations: MapViewProps[] = []

    restaurants.forEach((restaurant) => {
        locations.push({ place_id: restaurant.place_id, name: restaurant.name, lat: restaurant.latitude, lng: restaurant.longitude })
    })


    function onSelectedRestaurant(id: string){
        const restaurant = restaurants.find((restaurant) => restaurant.place_id === id);
        if(restaurant){
            setSelectedRestaurant(restaurant);
            setShowModal(true);
        }   
        
    }


  return (
    <Container className="border border-success bg-dark bg-gradient">
        
                <MapContainer center={[49.2827, -123.1207]} zoom={13} minZoom={10} maxZoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {restaurants.map((restaurant) => (
                    <Marker key={restaurant.place_id} position={[restaurant.latitude, restaurant.longitude]} icon={customIcon}>
                    <Popup className='custom-popup p-0 m-0'>
                        <MapRestaurantCard restaurant={restaurant} onSelectedRestaurant={onSelectedRestaurant}/>
                    </Popup>
                    </Marker>
                ))}
                
                {/* Condition to make sure a location source is set and userlocation not null  */}
                { source !== "" && userLocation && <Marker position={[userLocation?.lat, userLocation.lng]} icon={userIcon} />}
                </MapContainer>
        <DetailWindow selectedRestaurant={selectedRestaurant} showModal={showModal} setShowModal={setShowModal} ></DetailWindow>
    </Container>
    
  );
}
