import { useState } from 'react';
import { Button, Box, IconButton, Tooltip } from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material';

import { Ride } from '@communecar/types';

import RideCard from './RideCard';
import defaultTheme from '../../themes/default';
import CreateRideDialog from './CreateRideDialog';
import { Menu } from '../../Components/Menu/Menu';

export interface RidesFeedProps {
  rides: Ride[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
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
        <Button color="primary" onClick={() => setIsMenuOpen(true)}>
          <MenuIcon />
        </Button>
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
