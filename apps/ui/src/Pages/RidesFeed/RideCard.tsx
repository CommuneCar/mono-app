import {
  Box,
  Card,
  Button,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';
import { useState } from 'react';

import { Ride } from '@communecar/types';

import defaultTheme from '../../themes/default';
import RideDescription from './RideDescription';

const RideCard = ({
  png,
  driver,
  communityName,
  departureTime,
  destinationName,
  startLocationName
}: Ride) => {
  const [joined, setJoined] = useState(false);
  return (
    <Box sx={{ margin: '5%', width: '100%', maxWidth: 400 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia component="img" height="140" image={png} alt="tlv" />
        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
          <Typography gutterBottom variant="body2">
            {communityName}
          </Typography>
          <RideDescription
            driver={driver}
            departureTime={departureTime}
            startLocation={startLocationName}
            destination={destinationName}
          />
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            variant="contained"
            size="small"
            onClick={() => setJoined((prev) => !prev)}
            sx={{
              backgroundColor: joined
                ? defaultTheme.palette.success.light
                : defaultTheme.palette.primary.light,
            }}
          >
            {!joined ? 'Join Ride' : 'Joined'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RideCard;
