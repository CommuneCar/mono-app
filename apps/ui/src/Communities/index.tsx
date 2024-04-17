import Box from '@mui/material/Box';
import CommunityCard, { CommunityCardProps } from './CommunityCard';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import defaultTheme from '../themes/default';

export interface CommunitiesFeedProps {
  communities: CommunityCardProps[];
}

const RidesFeed = ({ communities }: CommunitiesFeedProps) => {
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
        <CommunityCard
          name={community.name}
          description={community.description}
          png={community.png}
        />
      ))}
    </Box>
  );
};

export default RidesFeed;
