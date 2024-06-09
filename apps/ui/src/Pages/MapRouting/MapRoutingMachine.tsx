import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import { useGetTrip } from '../../hooks/Rides/useGetTrip';

function MapRouting() {
    const rideId = 1;
    const { data: locations, isLoading, error } = useGetTrip(rideId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Filter out invalid locations
    const validLocations = locations?.filter(loc => 
        loc.lat >= -90 && loc.lat <= 90 &&
        loc.long >= -180 && loc.long <= 180 &&
        !(loc.lat === 1.5 && loc.long === 1.5)
    ) || [];

    return (
        <MapContainer style={{
            height: '100vh',
            width: '100vw',
            position: 'absolute',
            left: '0',
            top: '0',
            float: 'left',
            marginLeft: 0,
        }}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Routing waypoints={validLocations} />
        </MapContainer>
    );
}

export { MapRouting };
