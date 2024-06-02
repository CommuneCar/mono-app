import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { RideCard } from '../RideCard';
import { AddNewButton } from '../../AddNew/AddNewButton';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';
import { isMobile } from 'react-device-detect';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  userRideStatus: UserRidesStatus;
  communities: Community[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  userCommunities: Community[];
  openDialog?: boolean;
  setOpenDialog?: Dispatch<SetStateAction<boolean>>;
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

  const handleAddClick = (_event: React.MouseEvent) => {
    setIsCreateRideDialogOpen(true);
  };

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
      <AddNewButton
        handleAddClick={handleAddClick}
        tooltipText="Create a new ride"
      />
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
