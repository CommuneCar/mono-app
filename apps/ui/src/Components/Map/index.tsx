import React from 'react';
import { Map as MaplibreMap, NavigationControl, Marker, useControl } from 'react-map-gl/maplibre';
import { ArcLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';
import CarIcon from '../../assets/components/map/car.svg';
import PersonIcon from '../../assets/components/map/person.svg';
import './styles.css';

const mapStyles = {
  light: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  regular: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
};

interface Destination {
  longitude: number;
  latitude: number;
}

interface CustomMapProps {
  startPoint: [number, number];
  destinations: Destination[];
  mapStyle: keyof typeof mapStyles;
}

const Map: React.FC<CustomMapProps> = ({ startPoint, destinations, mapStyle }) => {
  const INITIAL_VIEW_STATE = {
    longitude: startPoint[0],
    latitude: startPoint[1],
    zoom: 12,
    bearing: 0,
    pitch: 30,
  };

  const layers = [
    new ArcLayer({
      id: 'arcs',
      data: destinations,
      getSourcePosition: () => startPoint,
      getTargetPosition: (d: any) => [d.longitude, d.latitude],
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 5,
    }),
  ];
  function DeckGLOverlay(props: any) {
    const overlay = useControl(() => new DeckOverlay(props));
    overlay.setProps(props);
    return null;
  }

  return (
    <MaplibreMap initialViewState={INITIAL_VIEW_STATE} mapStyle={mapStyles[mapStyle]}>
      <DeckGLOverlay layers={layers} />
      <NavigationControl position="top-left" />
      <Marker longitude={startPoint[0]} latitude={startPoint[1]}>
        <div style={{ textAlign: 'center' }}>
          <img src={CarIcon} alt="Car" style={{ width: '24px', height: '24px' }} />
          <div>Rabin Square, Tel Aviv</div>
        </div>
      </Marker>
      {destinations.map((destination, index) => (
        <Marker key={index} longitude={destination.longitude} latitude={destination.latitude}>
          <div style={{ textAlign: 'center' }}>
            <img src={PersonIcon} alt="Person" style={{ width: '24px', height: '24px' }} />
            <div>{`Destination ${index + 1}`}</div>
          </div>
        </Marker>
      ))}
    </MaplibreMap>
  );
};

export default Map;