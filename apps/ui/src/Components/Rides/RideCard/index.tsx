import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React from 'react';
import { Send } from '@mui/icons-material';
import { JoinRideDialog } from '../JoinRide';

interface RideCardProps {
  text: string;
  driver: string;
  joinRideDialogOpened: boolean;
  setJoinRideDialogOpened: (isOpen: boolean) => void;
}

const RideCard: React.FC<RideCardProps> = (props) => {
  const { text, driver, joinRideDialogOpened, setJoinRideDialogOpened } = props;

  const handleJoinRideClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    console.log('clicked on join ride');
    setJoinRideDialogOpened(true);
  };

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
        <Button
          endIcon={<Send />}
          variant={'contained'}
          size={'small'}
          onClick={handleJoinRideClick}
        >
          Join Ride
        </Button>
      </CardActions>
    </Card>
  );
};

export { RideCard };
