import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FilterAltOffRounded } from '@mui/icons-material';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';

import { Ride } from '@communecar/types';

import { CommunityWithRides } from './types';
import { RideCard } from '../Rides/RideCard';
import { useUser } from '../../hooks/Users/useUser';
import { DEFAULT_USER_ID } from '../../apis/utils/defaultConst';
import { useGetUserRidesStatus } from '../../hooks/Rides/useGetUserRidesStatus';
import { EmptyCommunityRides } from './EmptyCommunityRides';
import { SelectedCommunity } from '../../Pages/HomePage/HomePage';

dayjs.extend(relativeTime);

interface CommunityListProps {
  communities: CommunityWithRides[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  selectedCommunity?: SelectedCommunity;
  setSelectedCommunityId: React.Dispatch<any>;
  joinRideDialogOpened: boolean;
  setJoinRideDialogOpened: (isOpen: boolean) => void;
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  setSelectedRide,
  selectedCommunity,
  setSelectedCommunityId,
}) => {
  const { user } = useUser();
  const { data: rideStatuses } = useGetUserRidesStatus(
    user?.id ?? DEFAULT_USER_ID,
  );

  const filteredCommunities = useMemo(() => {
    return selectedCommunity?.communityId
      ? communities.filter(
          (community) => community.id === selectedCommunity.communityId,
        )
      : communities;
  }, [selectedCommunity?.communityId, communities]);

  const getEmptyRidestext = (communityTitle: string) =>
    `Sorry, No rides available for community: "${communityTitle}" for now`;

  return (
    <Box>
      <Box sx={{ minHeight: '2.5rem' }}>
        {selectedCommunity?.communityId && (
          <IconButton
            sx={{ display: 'flex' }}
            onClick={() => setSelectedCommunityId(undefined)}
          >
            <FilterAltOffRounded />
          </IconButton>
        )}
      </Box>
      <Box>
        {!isEmpty(filteredCommunities) ? (
          filteredCommunities.map((community, index) => (
            <Box key={index}>
              <Typography variant="h5" align="left" px={1}>
                {community.title}
              </Typography>
              {isEmpty(community.rides) ? (
                <EmptyCommunityRides
                  messageText={getEmptyRidestext(community.title)}
                />
              ) : (
                community.rides.map((ride, index) => (
                  <Box key={index} onClick={() => setSelectedRide(ride)}>
                    <RideCard
                      ride={ride}
                      rideStatus={rideStatuses?.[ride.id.toString()]}
                      communities={communities}
                    />
                  </Box>
                ))
              )}
            </Box>
          ))
        ) : (
          <EmptyCommunityRides
            messageText={
              selectedCommunity?.communityTitle &&
              !isEmpty(selectedCommunity.communityTitle)
                ? getEmptyRidestext(selectedCommunity.communityTitle)
                : undefined
            }
          />
        )}
      </Box>
    </Box>
  );
};

export { CommunityList };
