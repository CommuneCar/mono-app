import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction } from 'react';

import { Community, Ride} from '@communecar/types';

import { RideCard } from '../RideCard';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';
import { useUser } from '../../../hooks/Users/useUser';
dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  communities: Community[];
  isCreateRideDialog: boolean;
  userCommunities: Community[];
  userRideStatus: UserRidesStatus;
  setIsCreateRideDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  genderFilter: boolean;

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
  const { user } = useUser();
  const filteredRides = rides.filter(ride => !genderFilter || (user && ride.pronouns && ride.driver.gender == user.gender) );
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
