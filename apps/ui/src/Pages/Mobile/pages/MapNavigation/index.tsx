import React from 'react';

import { Page } from '../../../../common/styles/page';
import MultiCarMap from '../../../../Components/MapNavigation';

// Define multiple cars each with a start point and a list of destinations
const cars = [
  {
    id: 'car1',
    startPoint: [34.781769, 32.079444] as [number, number], // Explicitly type as tuple
    destinations: [
      { longitude: 34.773513, latitude: 32.095531 },
      { longitude: 34.801461, latitude: 32.113314 },
      { longitude: 34.751869, latitude: 32.050425 },
    ],
  },
  {
    id: 'car2',
    startPoint: [34.802, 32.0935] as [number, number], // Explicitly type as tuple
    destinations: [
      { longitude: 34.793513, latitude: 32.085531 },
      { longitude: 34.811461, latitude: 32.123314 },
      { longitude: 34.721869, latitude: 32.070425 },
    ],
  },
  {
    id: 'car3',
    startPoint: [34.771, 32.069] as [number, number], // Explicitly type as tuple
    destinations: [
      { longitude: 34.783513, latitude: 32.085531 },
      { longitude: 34.791461, latitude: 32.103314 },
      { longitude: 34.761869, latitude: 32.040425 },
    ],
  },
];

const MapNavigationPage: React.FC = () => {
  return (
    <Page className="full-viewport">
      <MultiCarMap cars={cars} mapStyle="regular" />
    </Page>
  );
};

export default MapNavigationPage;
