import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { RideCard } from '../RideCard';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  openDialog?: boolean;
  communities: Community[];
  userCommunities: Community[];
  userRideStatus: UserRidesStatus;
  setOpenDialog?: Dispatch<SetStateAction<boolean>>;
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  userCommunities,
  userRideStatus,
  setSelectedRide,
  openDialog,
  setOpenDialog,
}) => {
  const [isCreateRideDialog, setIsCreateRideDialogOpen] = useState(
    openDialog ?? false,
  );

  useEffect(() => {
    if (setOpenDialog) {
      setOpenDialog(isCreateRideDialog);
    }
  }, [isCreateRideDialog]);

  useEffect(() => {
    if (!!openDialog) {
      setIsCreateRideDialogOpen(openDialog);
    }
  }, [openDialog]);

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
          />
        </Box>
      ))}
    </Box>
  );
};

export { RidesList };
