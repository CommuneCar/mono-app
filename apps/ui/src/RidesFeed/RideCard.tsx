import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import defaultTheme from '../themes/default';

import tlv from '../assets/tlv.png';
import apple from '../assets/apple.png';
import camera from '../assets/camera.png';

export interface RidesCardProps {
  communityName: string;
  description: string;
}

const options = [tlv, apple, camera];

const RideCard = ({ communityName, description }: RidesCardProps) => {
  const getRandomOption = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  return (
    <Box style={{ margin: '5%' }}>
      <CssBaseline />
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={getRandomOption()}
          alt="tlv"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color={defaultTheme.palette.text.secondary}
          >
            {communityName}
          </Typography>
          <Typography
            variant="subtitle1"
            color={defaultTheme.palette.text.primary}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Join Ride</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RideCard;
