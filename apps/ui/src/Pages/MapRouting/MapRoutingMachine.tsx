// All credits goes to this legend - https://github.com/hliendo/react-route-map2
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";
import { LatLngExpression } from "leaflet";

function MapRouting() {
    const position: LatLngExpression = [51.505, -0.09];

    return (
        <MapContainer center={position} zoom={13} style={{
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
            <Routing />
        </MapContainer>
    );
}

export { MapRouting };