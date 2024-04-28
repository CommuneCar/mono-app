import React, { CSSProperties } from 'react';
import { Map } from '../../Components/Map/Map';

// Define start point and destinations
// const startPoint: [number, number] = [34.781769, 32.079444]; // Example start point
// const destinations = [
//   // Example destinations
//   { longitude: 34.773513, latitude: 32.095531 },
//   { longitude: 34.801461, latitude: 32.113314 },
//   { longitude: 34.751869, latitude: 32.050425 },
// ];

const MapPage: React.FC = () => {
  // Explicitly typing the mapContainerStyle object using CSSProperties
  const mapContainerStyle: CSSProperties = {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    left: '0',
    top: '0',
    float: 'left',
    marginLeft: 0,
  };

  return (
    <div style={mapContainerStyle} className="full-viewport">
      <Map />
    </div>
  );
};

export default MapPage;
