import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Ride } from '@communecar/types';

interface JoinRideProps {
  isOpen: boolean;
  ride: Ride;
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const RideDetails: React.FC<JoinRideProps> = ({
  isOpen,
  ride,
  setSelectedRide,
}) => {
  const formatRideStops = () => {
    const stops = ride.destination.map(
      (destination, index) => `${index + 1}. ${destination}`,
    );
    return stops.join('\n');
  };
  const onCancel = () => {
    setSelectedRide(undefined);
  };
  return (
    <Dialog open={isOpen} onClose={() => setSelectedRide(undefined)} fullWidth>
      <DialogTitle>Ride Details</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Driver:</Typography>
          </Box>
          {ride.driver.name}
        </Typography>
        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Start Location:</Typography>
          </Box>
          {ride.startLocationName}
        </Typography>
        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Destination:</Typography>
          </Box>
          {ride.destinationName}
        </Typography>
        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Stops:</Typography>
          </Box>
          {formatRideStops()}
        </Typography>
        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Community:</Typography>
          </Box>
          {ride.communityName}
        </Typography>


        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Shared drive gas fee:</Typography>
          </Box>
          {ride.gasMoney}
        </Typography>

        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Pronouns only:</Typography>
          </Box>
          {ride.pronouns ? 'yes' : 'no'}
        </Typography>

        <Typography component="div" display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Seats:</Typography>
          </Box>
          {ride.seats}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
