import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Ride } from '@communecar/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

import { CommunityWithRides } from './types';
import { RideCard } from '../RideCard/RideCard';

dayjs.extend(relativeTime);

interface CommunityListProps {
  communities: CommunityWithRides[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  communityId?: string;
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  setSelectedRide,
  communityId,
}) => {
  const filteredCommunities = useMemo(() => {
    return communityId
      ? communities.filter((community) => community.id === communityId)
      : communities;
  }, [communityId, communities]);

  return (
    <>
      {communityId && (
        <Box>
          <Button>Clear Filter</Button>
        </Box>
      )}
      <Box>
        {filteredCommunities.map((community, index) => (
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
                <Box key={index} onClick={() => setSelectedRide(ride)}>
                  <RideCard
                    driver={ride.driver.name}
                    text={`going from ${ride.startLocationName} to ${ride.destination} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
                  />
                </Box>
              ))
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export { CommunityList };
