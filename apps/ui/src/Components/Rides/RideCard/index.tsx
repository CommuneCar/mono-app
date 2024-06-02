import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Send, Info } from '@mui/icons-material';

import { Ride, UserRide } from '@communecar/types';

import { RideDetails } from '../RideDetails';
import { JoinRideDialog } from '../JoinRide';
import { rideStatusIcons } from '../../../utils/communities/userStatusIcons';

interface RideCardProps {
  ride: Ride;
  rideStatus: UserRide | undefined;
}

const RideCard: React.FC<RideCardProps> = ({ ride, rideStatus }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const isRideFull = ride.pickups.length === ride.seats;

  const handleJoinRideClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
        <CardContent>
          <Typography
            variant={'h6'}
            align={'left'}
            color={'text.secondary'}
            component={'h6'}
          >
            {`${ride.driver.firstName} ${ride.driver.lastName}`}
          </Typography>
          <Typography sx={{ fontSize: 14 }} align={'left'}>
            {`Going from ${ride.startLocationName} to ${ride.destinationName} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setIsInfoOpen(true)}>
            <Info />
          </IconButton>
          {!rideStatus ? (
            <Tooltip title={isRideFull ? 'Ride is full at the moment' : ''}>
              <Button
                endIcon={!isRideFull && <Send />}
                variant={'contained'}
                size={'small'}
                onClick={handleJoinRideClick}
                disabled={isRideFull}
              >
                {isRideFull ? 'Ride Full' : 'Join Ride'}
              </Button>
            </Tooltip>
          ) : (
            <IconButton disabled>
              {rideStatusIcons[rideStatus.status]}
            </IconButton>
          )}
        </CardActions>
      </Card>
      <JoinRideDialog
        isOpen={isDialogOpen}
        setOpen={setIsDialogOpen}
        rideToJoin={ride}
      />
      <RideDetails ride={ride} isOpen={isInfoOpen} setIsOpen={setIsInfoOpen} />
    </>
  );
};

export { RideCard };
