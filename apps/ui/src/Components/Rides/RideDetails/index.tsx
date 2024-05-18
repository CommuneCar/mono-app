import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  List,
  ListItem,
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
  const onCancel = () => {
    setSelectedRide(undefined);
  };
  return (
    <Dialog open={isOpen} onClose={() => setSelectedRide(undefined)} fullWidth>
      <DialogTitle>Ride Details</DialogTitle>
      <Divider />
      <DialogContent>
        <List>
          <ListItem>
            <Typography variant="subtitle1">Driver: {ride.driver.name}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Start Location: {ride.startLocationName}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Destination: {ride.destinationName}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Community: {ride.communityName}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Shared Drive Gas Fee: ${ride.gasMoney}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Pronouns Only: {ride.pronouns ? 'Yes' : 'No'}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1">Seats: {ride.seats}</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1" component="div">
              Pickups:
              {ride.pickups.map((pickup, index) => (
                <Typography key={index} sx={{ ml: 4 }}>
                  {`${index + 1}. ${pickup.name} (${pickup.lat}, ${pickup.lon})`}
                </Typography>
              ))}
            </Typography>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
