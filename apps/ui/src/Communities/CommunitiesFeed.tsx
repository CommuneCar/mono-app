import { Box, Button } from '@mui/material';
import { groupBy, mapValues } from 'lodash';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Community, UserStatus } from '@communecar/types';

import { Menu } from '../Components/Menu/Menu';
import { useUser } from '../hooks/Users/useUser';
import CommunityCard from './CommunityCard/CommunityCard';
import { SearchBar } from '../Components/Search/SearchBar';
import { FeedList } from '../Components/styles/FeedList.styled';
import { AddNewButton } from '../Components/AddNew/AddNewButton';
import { CreateCommunity } from './CommunityForms/CreateCommunity';
import { UpdateCommunity } from './CommunityForms/UpdateCommunity';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';

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
  const [communityToUpdate, setCommunityToUpdate] = useState<Community>();

  const handleClickOnEdit = (communityToUpdate: Community) => {
    setCommunityToUpdate(communityToUpdate);
    setIsEditOpen(true);
  };

  const handleClose = () => {
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
    setAllCommunitiesDisplay((prev) => {
      const communitiesObject = groupBy(prev, 'id');
      const communitiesDictionary: Record<string, Community> = mapValues(
        communitiesObject,
        (value) => value[0],
      );
      const newDisplay = {
        ...communitiesDictionary,
        [communityUpdated.id]: communityUpdated,
      };
      return Object.values(newDisplay);
    });
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'cetner', width: '100%' }}>
        <SearchBar
          options={options}
          handleChangeSearchValue={handleChangeSearchValue}
        />
        <Menu
          MenuButton={
            <Button sx={{ height: '100%' }} color="primary">
              <MenuIcon />
            </Button>
          }
        />
      </Box>
      {isCreateOpen && (
        <CreateCommunity
          isOpen={isCreateOpen}
          handleClose={handleClose}
          onCreate={handleNewCommunity}
        />
      )}
      {isEditOpen && communityToUpdate && (
        <UpdateCommunity
          isOpen={isEditOpen}
          handleClose={handleClose}
          onUpdate={handleUpdateCommunity}
          communityToUpdate={communityToUpdate}
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
