import dayjs from 'dayjs';
import React from 'react';
import { isEmpty } from 'lodash';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box, Card, CardContent, Typography } from '@mui/material';

import { CommunityWithRides } from './types';
import { RideCard } from '../RideCard/RideCard';

dayjs.extend(relativeTime);

interface CommunityListProps {
  communities: CommunityWithRides[];
}

const CommunityList: React.FC<CommunityListProps> = (props) => {
  const { communities } = props;

  return (
    <>
      {communities.map((community, index) => (
        <Box key={index}>
          <Typography variant="h5" align="left" px={1}>
            {community.name}
          </Typography>
          {isEmpty(community.rides) ? (
            <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
              <CardContent>
                <Typography align={'left'} sx={{ fontSize: 14 }}>
                  Sorry, No rides available for Community: "{community.name}"
                  for now
                </Typography>
              </CardContent>
            </Card>
          ) : (
            community.rides.map((ride, index) => (
              <RideCard
                driver={ride.driver}
                text={`going from ${ride.startLocation} to ${ride.destination} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
                key={index}
              />
            ))
          )}
        </Box>
      ))}
    </>
  );
};

export { CommunityList };
