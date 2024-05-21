import dayjs from 'dayjs';
import { Community, Ride } from '@communecar/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { RideCard } from '../RideCard';
import defaultTheme from '../../../themes/default';
import { CreateRideDialog } from '../../../Pages/RidesFeed/CreateRideDialog';
import { UserRidesStatus } from 'apps/ui/src/types/ride-user-type';

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
