import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { Fab, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import defaultTheme from '../themes/default';
import { Community } from '@communecar/types';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { CreateCommunityDialog } from './CreateCommunityDialog';
import { useState } from 'react';

export interface CommunitiesFeedProps {
  communities: Community[];
}

const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  const userCommunitiesStatus = useUserCommunitiesStatus('hi');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [allCommunitiesDisplay, setAllCommunitiesDisplay] =
    useState<Community[]>(communities);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNewCommunity = (newCommunity: Community) => {
    setAllCommunitiesDisplay((prev) => [newCommunity, ...prev]);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
        <Tooltip title="Create a new community">
          <Fab color="default" onClick={() => setIsOpen(true)}>
            <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
          </Fab>
        </Tooltip>
      </Box>
      {isOpen && (
        <CreateCommunityDialog
          handleClose={handleClose}
          isOpen={isOpen}
          handleNewCommunity={handleNewCommunity}
        />
      )}
      {allCommunitiesDisplay.map((community) => (
        <CommunityCard
          community={community}
          userStatus={userCommunitiesStatus[community.name]}
        />
      ))}
    </Box>
  );
};

export default CommunitiesFeed;
