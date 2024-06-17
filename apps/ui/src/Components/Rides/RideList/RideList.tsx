import dayjs from 'dayjs';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { isMobile } from 'react-device-detect';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useState } from 'react';

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
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  userCommunities,
  userRideStatus,
  setSelectedRide,
  isCreateRideDialog,
  setIsCreateRideDialogOpen,

}) => {
  const { user } = useUser();
  const [genderFilter, setGenderFilter] = useState<boolean>(false);
  const toggleGenderFilter = () => {
    setGenderFilter((prev) => !prev);
  };
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
      <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '1.5rem' }}>
        <FormControlLabel
          control={
            <Switch
              checked={genderFilter}
              onChange={toggleGenderFilter}
            />
          }
          label="Rides limited to my Gender"
        />
      </Box>
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
