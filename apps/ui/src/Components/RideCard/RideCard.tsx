import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React, { useState } from 'react';
import { Send } from '@mui/icons-material';
import JoinRideDialog from '../JoinRide/JoinRide';

interface RideCardProps {
  text: string;
  driver: string;
}

const RideCard: React.FC<RideCardProps> = (props) => {
  const { text, driver } = props;
  const [joinRideDialogOpened, setJoinRideDialogOpened] = useState(false);

  return (
    <Card variant={'outlined'} sx={{ m: 2, borderRadius: 5 }}>
      <CardContent>
        <Typography variant={'h6'} align={'left'} color={'text.secondary'}>
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
          onClick={() => setJoinRideDialogOpened(true)}
        >
          Join Ride
        </Button>
      </CardActions>
      <JoinRideDialog
        isOpen={joinRideDialogOpened}
        setOpen={setJoinRideDialogOpened}
      />
    </Card>
  );
};

export { RideCard };
