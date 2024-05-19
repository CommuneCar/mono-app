import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { Send } from '@mui/icons-material';
import { JoinRideDialog } from '../JoinRide';
import {
  CheckRounded,
  HourglassEmptyRounded,
  BlockRounded,
} from '@mui/icons-material';
import { UserRideStatus } from '@communecar/types';
import { useCreateUserRide } from '../../../hooks/Rides/useCreateUserRide';

const statusIcons: Record<UserRideStatus, JSX.Element> = {
  [UserRideStatus.CANCELLED]: <>Canclled</>,
  [UserRideStatus.PENDING]: <HourglassEmptyRounded />,
  [UserRideStatus.REJECTED]: <BlockRounded />,
  [UserRideStatus.CONFIRMED]: <CheckRounded />,
};

interface RideCardProps {
  text: string;
  driver: string;
  status?: UserRideStatus;
  userId: number;
}

const RideCard: React.FC<RideCardProps> = ({
  text,
  driver,
  status,
  userId,
}) => {
  const [joinRideDialogOpened, setJoinRideDialogOpened] = useState(false);
  const { createUserRide, isCreating } = useCreateUserRide();

  const handleJoinRideClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log('clicked on join ride');
    setJoinRideDialogOpened(true);
  };

  const handleSubmitJoinRequest = async () => {
    await createUserRide({ userId });
    setJoinRideDialogOpened(false);
  };

  const renderIcon = useMemo(() => {
    if (status) {
      return statusIcons[status];
    } else {
      return (
        <Button
          endIcon={<Send />}
          variant={'contained'}
          size={'small'}
          onClick={handleJoinRideClick}
          disabled={status === UserRideStatus.REJECTED}
        >
          Join Ride
        </Button>
      );
    }
  }, [status]);

  return (
    <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
      <CardContent>
        <Typography
          variant={'h6'}
          align={'left'}
          color={'text.secondary'}
          component={'h6'}
        >
          {driver}
        </Typography>
        <Typography sx={{ fontSize: 14 }} align={'left'}>
          {text}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {renderIcon}
      </CardActions>
      <JoinRideDialog
        isOpen={joinRideDialogOpened}
        setOpen={setJoinRideDialogOpened}
        handleSubmitJoinRequest={handleSubmitJoinRequest}
        isLoading={isCreating}
      />
    </Card>
  );
};

export { RideCard };
