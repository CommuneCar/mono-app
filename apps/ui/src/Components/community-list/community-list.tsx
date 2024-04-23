import React from 'react';
import { Typography } from '@mui/material';

import { RideCard } from '../ride-card/ride-card';

interface CommunityListProps {
  communities: {
    title: string;
    rides: {
      driver: string;
      text: string;
    }[];
  }[];
}

const CommunityList: React.FC<CommunityListProps> = (props) => {
  const { communities } = props;

  return (
    <>
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
    </>
  );
};

export { CommunityList };
