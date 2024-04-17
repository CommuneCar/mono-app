import Box from '@mui/material/Box';
import RideCard, { RidesCardProps } from './RideCard';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import defaultTheme from '../themes/default';
import { useState } from 'react';
import CreateRideDialog from './CreateRideDialog';

export interface RidesFeedProps {
  rides: RidesCardProps[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <Tooltip title="Create a new ride">
          <IconButton
            onClick={() => setOpen(true)}
            edge="end"
            color="inherit"
            aria-label="add"
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
      {open && (
        <CreateRideDialog rides={rides} setOpen={setOpen} isOpen={open} />
      )}
      {rides.map((ride) => (
        <RideCard
          communityName={ride.communityName}
          driver={ride.driver}
          departureTime={ride.departureTime}
          startLocation={ride.startLocation}
          destination={ride.destination}
          png={ride.png}
        />
      ))}
    </Box>
  );
};

export default RidesFeed;
