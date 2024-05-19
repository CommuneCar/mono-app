import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Ride } from '@communecar/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

import { CommunityWithRides } from './types';
import { RideCard } from '../Rides/RideCard';
import { FilterAltOffRounded } from '@mui/icons-material';

dayjs.extend(relativeTime);

interface CommunityListProps {
  communities: CommunityWithRides[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  communityId?: number;
  setSelectedCommunityId: React.Dispatch<any>;
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  setSelectedRide,
  communityId,
  setSelectedCommunityId,
}) => {
  const filteredCommunities = useMemo(() => {
    return communityId
      ? communities.filter((community) => community.id === communityId)
      : communities;
  }, [communityId, communities]);

  return (
    <Box>
      <Box sx={{ minHeight: '2.5rem' }}>
        {communityId && (
          <IconButton
            sx={{ display: 'flex' }}
            onClick={() => setSelectedCommunityId(undefined)}
          >
            <FilterAltOffRounded />
          </IconButton>
        )}
      </Box>
      <Box>
        {filteredCommunities.map((community, index) => (
          <Box key={index}>
            <Typography variant="h5" align="left" px={1}>
              {community.title}
            </Typography>
            {isEmpty(community.rides) ? (
              <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
                <CardContent>
                  <Typography align={'left'} sx={{ fontSize: 14 }}>
                    Sorry, No rides available for Community: "{community.title}"
                    for now
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              community.rides.map((ride, index) => (
                <Box key={index} onClick={() => setSelectedRide(ride)}>
                  <RideCard
                    driver={ride.driver.name}
                    text={`Going from ${ride.startLocationName} to ${ride.destinationName} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
                  />
                </Box>
              ))
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { CommunityList };
