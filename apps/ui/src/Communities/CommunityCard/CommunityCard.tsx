import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import defaultTheme from '../../themes/default';

import { UserStatus } from '@communecar/types';
import { useState } from 'react';
import { StatusButton } from './StatusButton';
import { Grid } from '@mui/material';
import { CommunityMembersDisplay } from './CommunityMembersDisplay';
import { ClientCommunity } from '../CommunityType';

export interface CommunityCardProps {
  community: ClientCommunity
}



const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { name, description, png, numberOfMembers, picturesUrl} = community;
  const [joined, setJoined] = useState(false);
  const [userStatus, setUserStatus] = useState<UserStatus>();


  return (
    <Box sx={{ margin: '5%', width: '100%', maxWidth: 400 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            color={defaultTheme.palette.text.primary}
            align='left'
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color={defaultTheme.palette.text.secondary}
            align='left'
          >
            {description}
          </Typography>
        </CardContent>
        
            <CardActions>
              <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                  <CommunityMembersDisplay total={numberOfMembers} pictures={picturesUrl}></CommunityMembersDisplay>
                </Grid>
                <Grid item xs={6}>
                  <StatusButton joined={joined} setJoined={setJoined}></StatusButton>
                </Grid>
              </Grid>
            </CardActions>
      </Card>
    </Box>
  );
};

export default CommunityCard;
