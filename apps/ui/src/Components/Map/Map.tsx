import React, { useEffect } from 'react';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import './Map.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

import placeholderIcon from '../../assets/components/map/car.svg';

type MarkerInfo = {
  geocode: [number, number];
  popUp: string;
};

interface MapProps {
  focusLocation?: [number, number];
  markers: MarkerInfo[];
}

const customIcon = new (Icon as any)({
  iconUrl: placeholderIcon,
  iconSize: [38, 38],
});

const createClusterCustomIcon = (cluster: any) =>
  new (divIcon as any)({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: point(33, 33, true),
  });

const SearchControl = () => {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: false,
      marker: {
        icon: new (Icon as any)({
          iconUrl: placeholderIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      },
    });

    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const Focus = (props: { focusLocation: [number, number] }) => {
  const map = useMap();
  const { focusLocation } = props;

  useEffect(() => {
    if (focusLocation) map.flyTo(focusLocation);
  }, [focusLocation]);

  return null;
};

const Map: React.FC<MapProps> = ({ markers, focusLocation }) => {
  return (
    <MapContainer center={[32.079444, 34.781769]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <SearchControl />
      {focusLocation && <Focus focusLocation={focusLocation} />}
    </MapContainer>
  );
};

export { Map };
export type { MarkerInfo };
