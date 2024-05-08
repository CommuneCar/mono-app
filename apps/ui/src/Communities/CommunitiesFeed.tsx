import Box from '@mui/material/Box';
import CommunityCard from './CommunityCard/CommunityCard';
import { AppBar, Toolbar } from '@mui/material';

import { Community, UserStatus } from '@communecar/types';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { SearchBar } from '../Components/Search/SearchBar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FeedList } from '../Components/styles/FeedList.styled';
import { AddNewButton } from '../Components/AddNew/AddNewButton';
import { useUser } from '../hooks/Users/useUser';
import { CommunityForm } from './CommunityForms/CommunityForm';
import { CreateCommunity } from './CommunityForms/CreateCommunity';

export interface CommunitiesFeedProps {
  communities: Community[];
}

const CommunitiesFeed: React.FC<CommunitiesFeedProps> = ({ communities }) => {
  const { user } = useUser();
  const userCommunitiesStatusOriginal = useUserCommunitiesStatus(
    user?.id ?? 'admin',
  );
  const [userCommunitiesStatus, setUserCommunitiesStatus] = useState(
    userCommunitiesStatusOriginal,
  );
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

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [communityToUpdate, setCommunityToUpdate] = useState<Community>();

  const handleClickOnEdit = (communityToUpdate: Community) => {
    setCommunityToUpdate(communityToUpdate);
    setIsOpen(true);
    setIsEditOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCommunityToUpdate(undefined);
    setIsCreateOpen(false);
    setIsEditOpen(false);
  };

  const handleNewCommunity = (newCommunity: Community) => {
    setUserCommunitiesStatus((prev) => ({
      ...prev,
      [newCommunity.id]: UserStatus.MANAGER,
    }));
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
      {/* {isOpen && (
        <CommunityForm
          communityToUpdate={communityToUpdate}
          onCreate={handleNewCommunity}
          onUpdate={handleUpdateCommunity}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )} */}
      {isCreateOpen && (
        <CreateCommunity
          isOpen={isCreateOpen}
          handleClose={handleClose}
          onCreate={handleNewCommunity}
        />
      )}
      <FeedList>
        {filteredCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            community={community}
            userStatus={userCommunitiesStatus[community.id]}
            handleClickOnEdit={handleClickOnEdit}
          />
        ))}
      </FeedList>
      <AddNewButton
        setIsOpen={setIsCreateOpen}
        tooltipText="Create a new community"
      />
    </Box>
  );
};

export { CommunitiesFeed };
