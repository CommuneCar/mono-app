import React, { Dispatch, SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Divider,
} from '@mui/material';
import { Ride } from '@communecar/types';
import { RideContentItem } from './RideContentItem';
import { DriverContentItem } from './DriverContentItem';
import { RidersContentItem } from './RidersContentItem';
import { useGetRidersByRideId } from '../../../hooks/Rides/useGetRiders';

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
  const { data: riders } = useGetRidersByRideId(ride.id);
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
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>Ride Details</DialogTitle>
      <Divider />
      <DialogContent>
        <DriverContentItem
          text={ride.driver.name}
          phoneNumber={ride.driver.phoneNumber}
        />
        <RideContentItem
          header="Start Location:"
          text={ride.startLocationName}
        />
        <RideContentItem header="Destination:" text={ride.destinationName} />
        <RideContentItem header="Stops:" text={formatRideStops()} />
        <RideContentItem header="Community:" text={ride.communityName} />
        <RidersContentItem riders={riders} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
