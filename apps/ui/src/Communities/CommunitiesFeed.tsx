import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { AppBar, Toolbar } from '@mui/material';

import { Community } from '@communecar/types';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { SearchBar } from '../Components/Search/SearchBar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CreateCommunityDialog } from './CommunityForms/CreateCommunityDialog';
import { FeedList } from '../Components/styles/FeedList.styled';
import { AddNewButton } from '../Components/AddNew/AddNewButton';
import { useUser } from '../hooks/Users/useUser';
import { CommunityForm } from './CommunityForms/CommunityForm';

export interface CommunitiesFeedProps {
  communities: Community[];
}

const CommunitiesFeed = ({ communities }: CommunitiesFeedProps) => {
  const { user } = useUser();
  const userCommunitiesStatus = useUserCommunitiesStatus(user?.id ?? 'admin');
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
  const [communityToUpdate, setCommunityToUpdate] = useState<Community>();

  const handleClickOnEdit = (communityToUpdate: Community) => {
    setCommunityToUpdate(communityToUpdate);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCommunityToUpdate(undefined);
  };

  const handleNewCommunity = (newCommunity: Community) => {
    setAllCommunitiesDisplay((prev) => [newCommunity, ...prev]);
  };

  const handleUpdateCommunity = (communityUpdated: Community) => {
    setAllCommunitiesDisplay((prev) =>
      prev.map((community) => {
        if (community.id === communityUpdated.id) {
          return communityUpdated;
        } else {
          return community;
        }
      }),
    );
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
        <CommunityForm
          communityToUpdate={communityToUpdate}
          onCreate={handleNewCommunity}
          onUpdate={handleUpdateCommunity}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}
      <FeedList>
        {filteredCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            community={community}
            userStatus={userCommunitiesStatus[community.name]}
            handleClickOnEdit={handleClickOnEdit}
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
