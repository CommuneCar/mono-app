import { Box } from '@mui/material';
import React, { CSSProperties } from 'react';

import { Map } from '../../../../Components/Map/Map';

const MapPage: React.FC = () => {
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
    <Box style={mapContainerStyle} className="full-viewport">
      <Map />
    </Box>
  );
};

export { MapPage };
