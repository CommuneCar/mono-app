// All credits goes to this legend - https://github.com/hliendo/react-route-map2
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import L from "leaflet";

function MapRouting() {
    const points: L.LatLng[] = [
        L.latLng(32.0809313, 34.7808127539372),  // Rabin Square
        L.latLng(32.0981945, 34.788607142459156),  // Sportek Tel Aviv
        L.latLng(32.07198795, 34.78888514103969)  // Sarona Market
    ];

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
            <Routing waypoints={points} />
        </MapContainer>
    );
}

export { MapRouting };