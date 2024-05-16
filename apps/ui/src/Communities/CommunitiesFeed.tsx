import { Box } from '@mui/material';
import { groupBy, mapValues } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Community, UserStatus } from '@communecar/types';

import { useUser } from '../hooks/Users/useUser';
import { SearchBar } from '../Components/Search/SearchBar';
import { CommunityCard } from './CommunityCard/CommunityCard';
import { FeedList } from '../Components/styles/FeedList.styled';
import { PageHeader } from '../Components/PageHeader/PageHeader';
import { AddNewButton } from '../Components/AddNew/AddNewButton';
import { MyEntitiesFilterButton } from './MyEntitiesFilterButton';
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
        (value) => value[0] as Community,
      );
      const newDisplay = {
        ...communitiesDictionary,
        [communityUpdated.id]: communityUpdated,
      };
      return Object.values(newDisplay);
    });
  };

  const [showMyCommunities, setShowMyCommunities] = useState(false);

  const myCommunities = useMemo(() => {
    const memberStatus = [UserStatus.APPROVED, UserStatus.MANAGER];
    return allCommunitiesDisplay.filter(
      (community) =>
        userCommunitiesStatus[community.id] &&
        memberStatus.includes(userCommunitiesStatus[community.id]),
    );
  }, [allCommunitiesDisplay, userCommunitiesStatus]);

  const handleMyCommunitiesFilter = (showMyCommunities: boolean) => {
    if (showMyCommunities) {
      setFilteredCommunities(myCommunities);
    } else {
      setFilteredCommunities(allCommunitiesDisplay);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 370,
      }}
    >
      <PageHeader title={'Communities'} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'cetner',
          width: '100%',
        }}
      >
        <SearchBar
          options={options}
          handleChangeSearchValue={handleChangeSearchValue}
        />
        <MyEntitiesFilterButton
          lable={'My Communities'}
          setShowMyEntities={setShowMyCommunities}
          showMyEntities={showMyCommunities}
          filter={handleMyCommunitiesFilter}
        ></MyEntitiesFilterButton>
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
