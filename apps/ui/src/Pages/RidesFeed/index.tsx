import { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { Ride } from '@communecar/types';

import RideCard from './RideCard';
import defaultTheme from '../../themes/default';
import CreateRideDialog from './CreateRideDialog';
import { PageHeader } from '../../Components/PageHeader/PageHeader';

export interface RidesFeedProps {
  rides: Ride[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <PageHeader title="Rides" />
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <Tooltip title="Create a new ride">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="add"
            onClick={() => setIsDialogOpen(true)}
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
      {isDialogOpen && (
        <CreateRideDialog
          rides={rides}
          isOpen={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
      {rides.map((ride) => (
        <RideCard key={ride.driver.id} {...ride} />
      ))}
    </Box>
  );
};

export default RidesFeed;
