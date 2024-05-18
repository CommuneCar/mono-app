import dayjs from 'dayjs';
import { Community, Ride } from '@communecar/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { RideCard } from '../RideCard';
import defaultTheme from '../../../themes/default';
import CreateRideDialog from '../../../Pages/RidesFeed/CreateRideDialog';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  communities: Community[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
  joinRideDialogOpened: boolean;
  setJoinRideDialogOpened: (isOpen: boolean) => void;
}

const RidesList: React.FC<RideListProps> = ({
  rides,
  communities,
  setSelectedRide,
  joinRideDialogOpened,
  setJoinRideDialogOpened,
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
            driver={ride.driver.name}
            text={`Going from ${ride.startLocationName} to ${ride.destinationName} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
            joinRideDialogOpened={joinRideDialogOpened}
            setJoinRideDialogOpened={setJoinRideDialogOpened}
          />
        </Box>
      ))}
    </Box>
  );
};

export { RidesList };
