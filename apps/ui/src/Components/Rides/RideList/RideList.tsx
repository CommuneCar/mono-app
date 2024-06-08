import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction } from 'react';

import { Community, Ride } from '@communecar/types';

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
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  userCommunities,
  userRideStatus,
  setSelectedRide,
  isCreateRideDialog,
  setIsCreateRideDialogOpen,
}) => {
  return (
    <Box sx={!isMobile ? { overflowY: 'auto', maxHeight: '78%' } : {}}>
      {isCreateRideDialog && (
        <CreateRideDialog
          communities={userCommunities}
          isOpen={isCreateRideDialog}
          setOpen={setIsCreateRideDialogOpen}
        />
      )}
      {rides.map((ride, index) => (
        <Box key={index} onClick={() => setSelectedRide(ride)}>
          <RideCard
            ride={ride}
            rideStatus={userRideStatus[ride.id.toString()]}
            communities={userCommunities}
          />
        </Box>
      ))}
    </Box>
  );
};

export { RidesList };
