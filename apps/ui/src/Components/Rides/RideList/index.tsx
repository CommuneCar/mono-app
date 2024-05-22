import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { RideCard } from '../RideCard';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';
import { AddNewButton } from '../../AddNew/AddNewButton';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  userRideStatus: UserRidesStatus;
  communities: Community[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  communities,
  userRideStatus,
  setSelectedRide,
}) => {
  const [isCreateRideDialog, setIsCreateRideDialogOpen] = useState(false);

  const handleAddClick = (_event: React.MouseEvent) => {
    setIsCreateRideDialogOpen(true);
  };

  return (
    <Box>
      <AddNewButton
        handleAddClick={handleAddClick}
        tooltipText="Create a new ride"
      />
      {isCreateRideDialog && (
        <CreateRideDialog
          communities={communities}
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
