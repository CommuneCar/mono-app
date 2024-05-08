import { useState } from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';

import { Ride } from '@communecar/types';

import RideCard from './RideCard';
import defaultTheme from '../../themes/default';
import CreateRideDialog from './CreateRideDialog';

export interface RidesFeedProps {
  rides: Ride[];
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
        <RideCard {...ride} />
      ))}
    </Box>
  );
};

export default RidesFeed;
