import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction } from 'react';

import { Community, Ride, Gender } from '@communecar/types';

import { RideCard } from '../RideCard';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  communities: Community[];
  isCreateRideDialog: boolean;
  userCommunities: Community[];
  userRideStatus: UserRidesStatus;
  setIsCreateRideDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  genderFilter: Gender | null;

}

const RidesList: React.FC<RideListProps> = ({
  rides,
  userCommunities,
  userRideStatus,
  setSelectedRide,
  isCreateRideDialog,
  setIsCreateRideDialogOpen,
  genderFilter
}) => {
  const filteredRides = rides.filter(ride => !genderFilter || (ride.pronouns && ride.driver.gender == genderFilter) );
  return (
    <Box sx={!isMobile ? { overflowY: 'auto', maxHeight: '78%' } : {}}>
      {isCreateRideDialog && (
        <CreateRideDialog
          communities={userCommunities}
          isOpen={isCreateRideDialog}
          setOpen={setIsCreateRideDialogOpen}
        />
      )}
      {filteredRides.map((ride, index) => (
        <Box key={index} onClick={() => setSelectedRide(ride)}>
          <RideCard
            ride={ride}
            rideStatus={userRideStatus[ride.id.toString()]}
          />
        </Box>
      ))}
    </Box>
  );
};

export { RidesList };
