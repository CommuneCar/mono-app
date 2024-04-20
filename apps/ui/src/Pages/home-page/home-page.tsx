import React from 'react';
import { Typography } from '@mui/material';

import { Page } from './styles';
import { communities } from './mock';
import Map from '../../Components/Map';
import { RideCard } from '../../Components/ride-card/ride-card';

const HomePage: React.FC = () => {
  return (
    <Page>
      <div style={{ height: '65%' }}>
        <Map
          mapStyle={'regular'}
          startPoint={[34.781769, 32.079444]}
          destinations={[]}
        />
      </div>
      <div
        style={{
          height: '35%',
          overflow: 'auto',
          border: 'solid 1px grey',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {communities.map((community, index) => (
          <div key={index}>
            <Typography variant="h5" align="left" px={1}>
              {community.title}
            </Typography>
            {community.rides.map((ride, index) => (
              <RideCard driver={ride.driver} text={ride.text} key={index} />
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
};

export { HomePage };
