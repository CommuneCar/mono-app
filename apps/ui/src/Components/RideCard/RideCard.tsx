import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React, { useState } from 'react';
import { Send } from '@mui/icons-material';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import { JoinRideDialog } from '../JoinRide/JoinRide';

interface RideCardProps {
  text: string;
  driver: string;
}

const RideCard: React.FC<RideCardProps> = (props) => {
  const { showMessage } = useSnackbar();
  const { text, driver } = props;
  const [joinRideDialogOpened, setJoinRideDialogOpened] = useState(false);

  const handleJoinRequest = () => {
    setJoinRideDialogOpened(true);
    showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
  };

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
          onClick={handleJoinRequest}
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
