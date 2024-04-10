import React, { CSSProperties } from 'react';
import CustomMap from '../../Components/CustomMap'; // Update the import path as necessary

// Define start point and destinations
const startPoint: [number, number] = [34.781769, 32.079444]; // Example start point
const destinations = [ // Example destinations
  { longitude: 34.773513, latitude: 32.095531 },
  { longitude: 34.801461, latitude: 32.113314 },
  { longitude: 34.751869, latitude: 32.050425 },
];

const MapPage: React.FC = () => {
    // Explicitly typing the mapContainerStyle object using CSSProperties
    const mapContainerStyle: CSSProperties = {
      height: '90vh',
      width: '50vw',
      position: 'relative', // This will now be correctly typed
      margin: '0 auto',
      minWidth: '800px',
      minHeight: '800px'
    };
  
    return (
      <div style={mapContainerStyle}>
        <CustomMap
          startPoint={startPoint}
          destinations={destinations}
          mapStyle="regular"
        />
      </div>
    );
  };

export default MapPage;
