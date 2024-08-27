import {
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { Ride } from '@communecar/types';
import { RideContentItem } from './RideContentItem';
import { DriverContentItem } from './DriverContentItem';
import { RidersContentItem } from './RidersContentItem';
import { useGetRidersByRideId } from '../../../hooks/Rides/useGetRiders';
import { useNavigate } from 'react-router-dom';
import { NearMe } from '@mui/icons-material';
import {cleanLocationName} from '../../../utils/ride/LocationClean.tsx';

interface JoinRideProps {
  isOpen: boolean;
  ride: Ride;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RideDetails: React.FC<JoinRideProps> = ({ isOpen, ride, setIsOpen }) => {
  const navigate = useNavigate();
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

  const navigateToRideDetails = () => {
    navigate(`/rides/${ride.id}`);
  };

  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth>
      <DialogTitle>
        <span>Ride Details</span>
        <Tooltip title="View on map">
          <IconButton onClick={navigateToRideDetails} style={{border: '1px solid #cecece', marginLeft: '10px', padding: '5px'}}>
            <NearMe color="primary" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DriverContentItem
          phoneNumber={ride.driver.phone}
          avatarUrl={ride.driver.avatarUrl}
          text={`${ride.driver.firstName} ${ride.driver.lastName}`}
        />
        <RideContentItem
          header="Start Location:"
          text={cleanLocationName(ride.startLocationName)}
        />
        <RideContentItem header="Destination:" text={cleanLocationName(ride.destinationName)} />
        <RideContentItem header="Community:" text={ride.communityName} />
        <RideContentItem
          header="Stops:"
          text={ride.pickups.length.toString()}
          tooltipText={formatRideStops()}
        />
        <RidersContentItem riders={riders} />
      </DialogContent>
      <DialogActions style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="primary" onClick={navigateToRideDetails}>
          View Route
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { RideDetails };
