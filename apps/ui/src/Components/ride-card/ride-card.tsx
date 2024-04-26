import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';
import React from 'react';
import { Send } from '@mui/icons-material';

interface RideCardProps {
  text: string;
  driver: string;
}

const RideCard: React.FC<RideCardProps> = (props) => {
  const { text, driver } = props;

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
        <Button endIcon={<Send />} variant={'contained'} size={'small'}>
          Join Ride
        </Button>
      </CardActions>
    </Card>
  );
};

export { RideCard };
