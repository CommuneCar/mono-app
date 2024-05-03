import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import defaultTheme from '../../themes/default';

import { useState } from 'react';
import RideDescription from './RideDescription';

export interface RidesCardProps {
  communityName: string;
  driver: string;
  departureTime: Date;
  startLocationName: string;
  destination: string;
  png: string;
}

const RideCard = ({
  communityName,
  driver,
  departureTime,
  startLocationName,
  destination,
  png,
}: RidesCardProps) => {
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
            destination={destination}
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
