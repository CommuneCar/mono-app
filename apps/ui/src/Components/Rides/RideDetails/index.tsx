import {
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import { Ride } from '@communecar/types';

import { RideContentItem } from './RideContentItem';
import { DriverContentItem } from './DriverContentItem';
import { RidersContentItem } from './RidersContentItem';
import { useGetRidersByRideId } from '../../../hooks/Rides/useGetRiders';

interface JoinRideProps {
  isOpen: boolean;
  ride: Ride;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RideDetails: React.FC<JoinRideProps> = ({ isOpen, ride, setIsOpen }) => {
  const { data: riders } = useGetRidersByRideId(ride.id);

  const onCancel = () => {
    setIsOpen(false);
  };

  const formatRideStops = () => {
    const stops = ride.pickups.map((destination, index) => {
      const locationName =
        destination.name ?? 'Error loading location, please try later';
      return `${index + 1} -  ${locationName}`;
    });
    return stops.join('\n');
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>Ride Details</DialogTitle>
      <Divider />
      <DialogContent>
        <DriverContentItem
          phoneNumber={ride.driver.phone}
          avatarUrl={ride.driver.avatarUrl}
          text={`${ride.driver.firstName} ${ride.driver.lastName}`}
        />
        <RideContentItem
          header="Start Location:"
          text={ride.startLocationName}
        />
        <RideContentItem header="Destination:" text={ride.destinationName} />
        <RideContentItem header="Community:" text={ride.communityName} />
        <RideContentItem
          header="Stops:"
          text={ride.pickups.length.toString()}
          tooltipText={formatRideStops()}
        />
        <RidersContentItem riders={riders} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
