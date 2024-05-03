import { AppBar, Toolbar, Box } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CommunityCard from './CommunityCard/CommunityCard';

import { Community } from '@communecar/types';

import { SearchBar } from '../Search/SearchBar';
import { FeedList } from '../styles/FeedList.styled';
import { AddNewButton } from '../AddNew/AddNewButton';
import { CreateCommunityDialog } from './CreateCommunityDialog';
import { useUserCommunitiesStatus } from '../../hooks/Communities/useUserCommunitiesStatus';

export interface CommunitiesFeedProps {
  communities: Community[];
}

const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  const userCommunitiesStatus = useUserCommunitiesStatus('hi');
  const [allCommunitiesDisplay, setAllCommunitiesDisplay] =
    useState<Community[]>(communities);
  const [filteredCommunities, setFilteredCommunities] = useState(
    allCommunitiesDisplay,
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const options = useMemo(
    () => allCommunitiesDisplay.map((community) => community.name),
    [allCommunitiesDisplay],
  );

  const handleChangeSearchValue = (value: string) => {
    const lowerCaseValue = value?.toLowerCase();
    setSearchValue(lowerCaseValue);
    filterCommunities(lowerCaseValue);
  };

  const filterCommunities = useCallback(
    (value: string) => {
      const newFilteredCommuniuties = value
        ? allCommunitiesDisplay.filter((community) =>
            community.name.toLowerCase().includes(value),
          )
        : allCommunitiesDisplay;
      setFilteredCommunities(newFilteredCommuniuties);
    },
    [allCommunitiesDisplay],
  );

  useEffect(() => {
    filterCommunities(searchValue);
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
      <FeedList>
        {filteredCommunities.map((community, index) => (
          <CommunityCard
            community={community}
            userStatus={userCommunitiesStatus[community.name]}
            key={index}
          />
        ))}
      </FeedList>
      <AddNewButton
        setIsOpen={setIsOpen}
        tooltipText="Create a new community"
      />
    </Box>
  );
};

export default CommunitiesFeed;