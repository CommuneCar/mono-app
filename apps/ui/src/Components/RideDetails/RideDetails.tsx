import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box,
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
      (destination, index) => `${index + 1}.${destination}`,
    );
    return stops.join('\n');
  };
  const onCancel = () => {
    setSelectedRide(undefined);
  };
  return (
    <Dialog open={isOpen} onClose={() => setSelectedRide(undefined)} fullWidth>
      <DialogTitle>Ride Details</DialogTitle>
      <DialogContent>
        <DialogContentText display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Driver:</Typography>
          </Box>
          {ride.driver.name}
        </DialogContentText>
        <DialogContentText display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Start Location:</Typography>
          </Box>
          {ride.startLocationName}
        </DialogContentText>
        <DialogContentText display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Destination:</Typography>
          </Box>
          {ride.destinationName}
        </DialogContentText>
        <DialogContentText display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Stops:</Typography>
          </Box>
          {formatRideStops()}
        </DialogContentText>
        <DialogContentText display="flex" alignItems="center">
          <Box component="span" sx={{ mr: 1 }}>
            <Typography variant="subtitle1">Community:</Typography>
          </Box>
          {ride.communityName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
