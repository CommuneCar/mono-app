import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Send, Info } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { Community, Ride, UserRide, UserRideStatus } from '@communecar/types';

import { RideDetails } from '../RideDetails';
import { JoinRideDialog } from '../JoinRide';
import { rideStatusIcons } from '../../../utils/communities/userStatusIcons';
import { useUser } from '../../../hooks/Users/useUser';
import { EditRideDialog } from '../EditRide';
import { SPACING } from '../../../themes/default/consts';
import { useEditRider } from '../../../hooks/Rides/useEditRiders';
import {cleanLocationName} from '../../../utils/ride/LocationClean';

interface RideCardProps {
  ride: Ride;
  rideStatus: UserRide | undefined;
  communities: Community[];
  disabled?: boolean;
}

const RideCard: React.FC<RideCardProps> = ({
  ride,
  rideStatus,
  communities,
  disabled,
}) => {
  const { user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isEditRideOpen, setIsEditRideOpen] = useState(false);
  const isRideFull = ride.pickups.length === ride.seats;
  const startLocationNameCleaned = cleanLocationName(ride.startLocationName);
  const endLocationNameCleaned = cleanLocationName(ride.destinationName);
  const { mutateAsync: editRider } = useEditRider(
    ride.id,
    UserRideStatus.CANCELLED,
  );

  const handleJoinRideClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleExitRideClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    editRider(user!.id);
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
            <div>
              {`Going from ${startLocationNameCleaned} to ${endLocationNameCleaned}`}
              <div>{dayjs(Date.now()).to(dayjs(ride.departureTime))}</div>
            </div>
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setIsInfoOpen(true)}>
          <Info />
          </IconButton>
          {user?.id === ride.driver.id && (
            <IconButton onClick={() => setIsEditRideOpen(true)}>
              <EditIcon />
            </IconButton>
          )}
          {!rideStatus ? (
            <Tooltip title={isRideFull ? 'Ride is full at the moment' : ''}>
              <Box>
                <Button
                  endIcon={!isRideFull && <Send />}
                  variant={'contained'}
                  size={'small'}
                  onClick={handleJoinRideClick}
                  disabled={isRideFull || ride.driver.id === user?.id || disabled}
                >
                  {isRideFull ? 'Ride Full' : 'Join Ride'}
                </Button>
              </Box>
            </Tooltip>
          ) : (
            <Box display="flex" flexDirection="row" gap={SPACING.SP4}>
              <IconButton disabled>
                {rideStatusIcons[rideStatus.status]}
              </IconButton>
              {rideStatus.status === UserRideStatus.CONFIRMED && (
                <Tooltip title="Exit ride" placement="top" arrow>
                  <IconButton onClick={handleExitRideClick}>
                    <PersonRemoveIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </CardActions>
      </Card>
      <JoinRideDialog
        isOpen={isDialogOpen}
        setOpen={setIsDialogOpen}
        rideToJoin={ride}
      />
      <RideDetails ride={ride} isOpen={isInfoOpen} setIsOpen={setIsInfoOpen} />
      {isEditRideOpen && (
        <EditRideDialog
          isOpen={isEditRideOpen}
          setOpen={setIsEditRideOpen}
          ride={ride}
          communities={communities}
        />
      )}
    </>
  );
};

export { RideCard };
