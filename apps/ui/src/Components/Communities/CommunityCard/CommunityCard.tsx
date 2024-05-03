import {
  Box,
  Card,
  Grid,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material';
import { useState } from 'react';

import { UserStatus, Community } from '@communecar/types';

import { StatusButton } from './StatusButton';
import defaultTheme from '../../../themes/default';
import { CommunityMembersDisplay } from './CommunityMembersDisplay';

export interface CommunityCardProps {
  community: Community;
  userStatus: UserStatus;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  userStatus,
}) => {
  const { name, description, picturesUrl } = community;
  const [joined, setJoined] = useState(false);

  //TODO - handleChangeStatus
  console.log({ joined }); //TODO when the server ready

  return (
    <Box sx={{ marginBottom: '5%', width: '100%', maxWidth: 400 }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            color={defaultTheme.palette.text.primary}
            align="left"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color={defaultTheme.palette.text.secondary}
            align="left"
          >
            {description}
          </Typography>
        </CardContent>

        <CardActions>
          <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <CommunityMembersDisplay
                pictures={picturesUrl}
              ></CommunityMembersDisplay>
            </Grid>
            <Grid item xs={6}>
              <StatusButton
                setJoined={setJoined}
                status={userStatus}
              ></StatusButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CommunityCard;
