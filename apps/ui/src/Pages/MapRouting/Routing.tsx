import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { TripRouteLocation } from "@communetypes/Trip";
import { sleepInMS } from "../../utils/sleep";


interface RoutingProps {
  waypoints: TripRouteLocation[];
}

export default function Routing({ waypoints }: RoutingProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      plan: L.Routing.plan(waypoints.map(loc => L.latLng(loc.lat, loc.long)), {
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: L.icon({
              iconUrl: "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/logo-no-title.png",
              iconSize: [64, 64],
              className: "override",
            })
          }).bindPopup(waypoints[i].userName);
        },
        routeWhileDragging: false
      }),
      routeWhileDragging: false,
      showAlternatives: true,
      lineOptions: {
        styles: [{ color: "#338CFF", opacity: 1, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      }
    })
      .addTo(map);

    return () => {
      // Some random error related to "removeLayer" seems to occur without this (black magic type of ****)
      sleepInMS(300).then(() => {
        if (map && routingControl && map.removeLayer !== null) {
          map.removeControl(routingControl);
        }
      });
    };
  }, [map, waypoints]);

  return null;
}
