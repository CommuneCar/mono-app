import { useState } from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import { Ride } from '@communecar/types';

import RideCard from './RideCard';
import defaultTheme from '../../themes/default';
import CreateRideDialog from './CreateRideDialog';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import React from 'react';
import { addNewRide } from '../../apis/rides/add-new-ride';

export interface RidesFeedProps {
  rides: Ride[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ride, setRide] = useState<Ride>({
    driver: {
      id: 1,
      name: 'John Doe'
    },
    departureTime: new Date(),
    communityName: 'Community XYZ',
    startLocationName: 'Start Location',
    startLocation: [34.0522, -118.2437],
    destinationName: 'Destination',
    destination: [40.7128, -74.0060],
    png: '',
    gasMoney: 20,
    pronouns: true,
    seats: 4
  });


  const handleCreateRide = async () => {
    try {
      const newRide = await addNewRide(ride);
      console.log('New Ride Created:', newRide);
    } catch (error) {
      console.error('Error creating new ride:', error);
    }
  };
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <PageHeader title="Rides" />
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <button onClick={handleCreateRide}>Create Ride</button>
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
      {rides.map((ride, index) => (
        <RideCard key={index} {...ride} />
      ))}
    </Box>
  );
};

export { RidesFeed };
