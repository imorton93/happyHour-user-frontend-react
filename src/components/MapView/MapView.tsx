import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issue in React apps
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button, Card, Container } from 'react-bootstrap';
import { Restaurant } from '../../types/Restaurant';
import { useState } from 'react';
import DetailWindow from '../DetailWindow/DetailWindow';
import MapRestaurantCard from './MapRestaurantCard';

// Fix Leaflet marker icon issue in React
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
   yelpid: string; name: string; lat: number; lng: number;
}

export default function MapView({ restaurants }: { restaurants: Restaurant[]}) {

    const[showModal, setShowModal] = useState(false);
    const[selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

    let locations: MapViewProps[] = []

    restaurants.forEach((restaurant) => {
        locations.push({ yelpid: restaurant.yelpid, name: restaurant.name, lat: restaurant.latitude, lng: restaurant.longitude })
    })


    function onSelectedRestaurant(id: string){
        const restaurant = restaurants.find((restaurant) => restaurant.yelpid === id);
        if(restaurant){
            setSelectedRestaurant(restaurant);
            setShowModal(true);
        }   
        
    }


  return (
    <Container className="border border-success h-75 bg-dark bg-gradient" style={{ overflowY: "auto"}}>
        
                <MapContainer center={[49.2827, -123.1207]} zoom={13} minZoom={10} maxZoom={16} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {restaurants.map((restaurant) => (
                    <Marker key={restaurant.yelpid} position={[restaurant.latitude, restaurant.longitude]} icon={customIcon}>
                    <Popup>
                        <MapRestaurantCard restaurant={restaurant}/>
                        <Button
                            variant="primary"
                            onClick={() => onSelectedRestaurant(restaurant.yelpid)}
                        >
                        See Deals
                        </Button>
                    </Popup>
                    </Marker>
                ))}
                </MapContainer>
        <DetailWindow selectedRestaurant={selectedRestaurant} showModal={showModal} setShowModal={setShowModal} ></DetailWindow>
    </Container>
    
  );
}
