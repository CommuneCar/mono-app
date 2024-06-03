import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { sleepInMS } from "../../utils/sleep";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/logo-no-title.png",
  iconSize: [64, 64],
});

interface RoutingProps {
  waypoints: L.LatLng[];
}

export default function Routing({ waypoints }: RoutingProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: "#338CFF", opacity: 1, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      routeWhileDragging: false,
    }).addTo(map);

    return () => {
      // Some random error related to "removeLayer" seems to occur without this (black magic type of ****)
      sleepInMS(100).then(() => {
        if (map && routingControl) {
          map.removeControl(routingControl);
        }
      })
    };
  }, [map, waypoints]);

  return null;
}
