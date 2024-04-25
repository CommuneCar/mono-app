import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import defaultTheme from '../themes/default';
import { ClientCommunity } from './CommunityType';
import { getRandomOption } from '../utils';
import { UserStatus } from '@communecar/types';

export interface CommunitiesFeedProps {
  communities: ClientCommunity[];
}

const userStatusOptions: UserStatus[]  = ['Approved', 'Pending', 'Rejected']


const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <Tooltip title="Create a new ride">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="add"
            sx={{
              '&:hover': {
                backgroundColor: defaultTheme.palette.action.hover,
              },
            }}
          >
            <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
          </IconButton>
        </Tooltip>
      </Box>
      {communities.map((community) => (
        <CommunityCard community={community} userStatus={getRandomOption(userStatusOptions) as UserStatus}/>
      ))}
    </Box>
  );
};

export default CommunitiesFeed;
