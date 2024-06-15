import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { TripRouteLocation } from "@communetypes/Trip";
import { sleepInMS } from "../../utils/sleep";
import { RideFeeDialogHandle } from "./RideFeeDialog";
import { AVERAGE_FUEL_COST, AVERAGE_LITERS_PER_KM } from "./const";

interface RoutingProps {
  passengersCount: number;
  waypoints: TripRouteLocation[];
  dialogRef: React.RefObject<RideFeeDialogHandle>;
}

const resolveWaypointIcon = (index: number, waypoints: TripRouteLocation[]) => {
  switch (index) {
    case 0:
      return L.icon({
        iconUrl: "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/car.svg?t=2024-06-14T07%3A13%3A35.892Z",
        iconSize: [64, 64],
        className: "override",
      });
    case waypoints.length - 1:
      return L.icon({
        iconUrl: "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/destination.png",
        iconSize: [64, 64],
        className: "override",
      });
    default:
      return L.icon({
        iconUrl: "https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/public-assets/logo-no-title.png",
        iconSize: [64, 64],
        className: "override",
      });
  }
}

const resolveWaypointPopup = (index: number, waypoints: TripRouteLocation[]) => {
  if (waypoints[index].type === "start") {
    return "Starting point";
  } else if (waypoints[index].type === "end") {
    return "Drive destination";
  } else {
    return `${waypoints[index].userName}'s ${waypoints[index].type}`;
  }
}

const Routing = ({ waypoints, dialogRef, passengersCount }: RoutingProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      plan: L.Routing.plan(waypoints.map(loc => L.latLng(loc.lat, loc.long)), {
        createMarker: function (i, wp) {
          return L.marker(wp.latLng, {
            draggable: false,
            icon: resolveWaypointIcon(i, waypoints),
          }).bindPopup(resolveWaypointPopup(i, waypoints))
        },
        routeWhileDragging: false
      }),
      routeWhileDragging: false,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: "#338CFF", opacity: 1, weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      }
    })
      .addTo(map);

    // Calculate the fare based on the distance, using the formula presented in https://www.omnicalculator.com/everyday-life/carpooling
    routingControl.on('routesfound', (e) => {
      const routes = e.routes;
      const summary = routes[0].summary;

      // Fuel consumption cost calculation
      const distanceInKM = summary.totalDistance / 1000;
      const fuelConsumption = distanceInKM / AVERAGE_LITERS_PER_KM;
      const fuelCost = fuelConsumption * AVERAGE_FUEL_COST;
      const rideFee = fuelCost / passengersCount;

      // Update the dialog with the new ride fee
      if (dialogRef.current) {
        dialogRef.current.updateFare(Math.ceil(rideFee));
      }
    });

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

export { Routing };