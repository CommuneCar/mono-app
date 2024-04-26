import React, { useState } from 'react';
import {
  Map as MaplibreMap,
  NavigationControl,
  Marker,
<<<<<<< HEAD
  Popup,
=======
>>>>>>> 304caced9d8bd1a773650a5c8e08eb487952b9bb
  useControl,
} from 'react-map-gl/maplibre';
import { ArcLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';
import CarIcon from '../../assets/components/map/car.svg';
import PersonIcon from '../../assets/components/map/person.svg';

const mapStyles = {
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  regular: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
};

interface Car {
  id: string;
  startPoint: [number, number];
  destinations: Destination[];
}

interface Destination {
  longitude: number;
  latitude: number;
}

interface MultiCarMapProps {
  cars: Car[];
  mapStyle: keyof typeof mapStyles;
}

const MultiCarMap: React.FC<MultiCarMapProps> = ({ cars, mapStyle }) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
  };

  const INITIAL_VIEW_STATE = {
    longitude: 34.7818, // Default to some central location
    latitude: 32.0853,
    zoom: 12,
    bearing: 0,
    pitch: 30,
  };

  const layers = selectedCar
    ? [
        new ArcLayer({
          id: `arcs-${selectedCar.id}`,
          data: selectedCar.destinations,
          getSourcePosition: () => selectedCar.startPoint,
          getTargetPosition: (d: any) => [d.longitude, d.latitude],
          getSourceColor: [0, 128, 200],
          getTargetColor: [200, 0, 80],
          getWidth: 5,
        }),
      ]
    : [];

  function DeckGLOverlay(props: any) {
    const overlay = useControl(() => new DeckOverlay(props));
    overlay.setProps(props);
    return null;
  }

  return (
    <MaplibreMap
      initialViewState={INITIAL_VIEW_STATE}
      mapStyle={mapStyles[mapStyle]}
    >
      <DeckGLOverlay layers={layers} />
      <NavigationControl position="top-left" />
      {cars.map((car) => (
        <Marker
          key={car.id}
          longitude={car.startPoint[0]}
          latitude={car.startPoint[1]}
          onClick={() => handleCarSelect(car)}
        >
          <div style={{ cursor: 'pointer', textAlign: 'center' }}>
            <img
              src={CarIcon}
              alt="Car"
              style={{ width: '24px', height: '24px' }}
            />
          </div>
        </Marker>
      ))}
      {selectedCar &&
        selectedCar.destinations.map((destination, index) => (
          <Marker
            key={index}
            longitude={destination.longitude}
            latitude={destination.latitude}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={PersonIcon}
                alt="Person"
                style={{ width: '24px', height: '24px' }}
              />
              <div>{`Destination ${index + 1}`}</div>
            </div>
          </Marker>
        ))}
    </MaplibreMap>
  );
};

export default MultiCarMap;
