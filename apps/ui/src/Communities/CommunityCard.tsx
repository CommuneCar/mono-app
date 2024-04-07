import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import defaultTheme from '../themes/default';

import { useState } from 'react';

export interface CommunityCardProps {
  name: string;
  description: string;
  png: string;
}

const CommunityCard = ({ name, description, png }: CommunityCardProps) => {
  const [joined, setJoined] = useState(false);

  return (
    <Box style={{ margin: '5%' }}>
      <Card>
        <CardMedia component="img" height="140" image={png} alt="tlv" />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color={defaultTheme.palette.text.secondary}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color={defaultTheme.palette.text.primary}
          >
            {description}
          </Typography>
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
            {!joined ? 'Ask to Join' : 'Joined'}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CommunityCard;
