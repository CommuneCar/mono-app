import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { RideCard } from '../RideCard';
import defaultTheme from '../../../themes/default';
import { UserRidesStatus } from '../../../types/ride-user-type';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  userRideStatus: UserRidesStatus;
  communities: Community[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  userCommunities: Community[];
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  userCommunities,
  userRideStatus,
  setSelectedRide,
}) => {
  const [isCreateRideDialog, setIsCreateRideDialogOpen] = useState(false);

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCreateRideDialogOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 5,
        }}
      >
        <Tooltip title="Create a new ride">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="add"
            onClick={handleAddClick}
            sx={{
              '&:hover': {
                backgroundColor: defaultTheme.palette.action.hover,
              },
            }}
          >
            <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
          </IconButton>
        </Tooltip>
      </Box>
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
