import { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { Community, Ride } from '@communecar/types';

import RideCard from './RideCard';
import defaultTheme from '../../themes/default';
import CreateRideDialog from './CreateRideDialog';
import { PageHeader } from '../../Components/PageHeader/PageHeader';

export interface RidesFeedProps {
  rides: Ride[];
  communities: Community[];
}

const RidesFeed = ({ rides, communities }: RidesFeedProps) => {
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
          communities={communities}
          isOpen={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
      {rides.map((ride, index) => (
        <RideCard key={index} {...ride} />
      ))}
    </Box>
  );
};

export { RidesFeed };
