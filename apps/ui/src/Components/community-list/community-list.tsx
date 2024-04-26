import dayjs from 'dayjs';
import React from 'react';
import { isEmpty } from 'lodash';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Card, CardContent, Typography } from '@mui/material';

import { Community } from '@communecar/types';

import { RideCard } from '../ride-card/ride-card';

dayjs.extend(relativeTime);

type CommunityWithRides = Community & { rides: any[] };

interface CommunityListProps {
  communities: CommunityWithRides[];
}

const CommunityList: React.FC<CommunityListProps> = (props) => {
  const { communities } = props;

  return (
    <>
      {communities.map((community, index) => (
        <div key={index}>
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
        </div>
      ))}
    </>
  );
};

export { CommunityList };
