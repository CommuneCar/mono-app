import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { AppBar, Fab, List, Toolbar, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import defaultTheme from '../themes/default';
import { Community } from '@communecar/types';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { SearchBar } from '../Components/Search/SearchBar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CreateCommunityDialog } from './CreateCommunityDialog';

export interface CommunitiesFeedProps {
  communities: Community[];
}

const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  const userCommunitiesStatus = useUserCommunitiesStatus('hi');
  const [allCommunitiesDisplay, setAllCommunitiesDisplay] =
    useState<Community[]>(communities);
  const [filteredCommuniuties, setFilteredCommuniuties] = useState(
    allCommunitiesDisplay,
  );
  const [searchValue, setSearchValue] = useState<string>();

  const options = useMemo(
    () => allCommunitiesDisplay.map((community) => community.name),
    [allCommunitiesDisplay],
  );

  const handleChangeSearchValue = (value: string | undefined) => {
    const lowerCaseValue = value?.toLowerCase();
    setSearchValue(lowerCaseValue);
    filteredListDisplay(lowerCaseValue);
  };

  const filteredListDisplay = useCallback(
    (value: string | undefined) => {
      const newFilteredCommuniuties = value
        ? allCommunitiesDisplay.filter((community) =>
            community.name.toLowerCase().includes(value),
          )
        : allCommunitiesDisplay;
      setFilteredCommuniuties(newFilteredCommuniuties);
    },
    [allCommunitiesDisplay],
  );

  useEffect(() => {
    filteredListDisplay(searchValue);
  }, [allCommunitiesDisplay]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      <AppBar
        color="default"
        sx={{
          borderRadius: 2,
          padding: 0,
          marginX: 10,
          right: 'auto',
          left: 'auto',
          paddingY: 2,
        }}
      >
        <Toolbar variant={'regular'}>
          <SearchBar
            options={options}
            handleChangeSearchValue={handleChangeSearchValue}
          ></SearchBar>
        </Toolbar>
      </AppBar>
      {isOpen && (
        <CreateCommunityDialog
          handleClose={handleClose}
          isOpen={isOpen}
          handleNewCommunity={handleNewCommunity}
        />
      )}
      <List
        sx={{
          width: '100%',
          top: '5rem',
        }}
      >
        {filteredCommuniuties.map((community, index) => (
          <CommunityCard
            community={community}
            userStatus={userCommunitiesStatus[community.name]}
            key={index}
          />
        ))}
      </List>
      <Tooltip title="Create a new community">
        <Fab
          color="default"
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: '0%',
            right: '1%',
            margin: '1%',
          }}
        >
          <AddIcon sx={{ color: defaultTheme.palette.info.dark }} />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default CommunitiesFeed;
