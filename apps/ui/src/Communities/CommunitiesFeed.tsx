import { Box } from '@mui/material';
import { groupBy, mapValues } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Community, UserStatus } from '@communecar/types';

import { useUser } from '../hooks/Users/useUser';
import { SearchBar } from '../Components/Search/SearchBar';
import { DEFAULT_USER_ID } from '../apis/utils/defaultConst';
import { CommunityCard } from './CommunityCard/CommunityCard';
import { UserCommunitiesStatus } from '../types/community-type';
import { FeedList } from '../Components/styles/FeedList.styled';
import { PageLoader } from '../Components/PageLoader/PageLoader';
import { PageHeader } from '../Components/PageHeader/PageHeader';
import { AddNewButton } from '../Components/AddNew/AddNewButton';
import { MyEntitiesFilterButton } from './MyEntitiesFilterButton';
import { CreateCommunity } from './CommunityForms/CreateCommunity';
import { UpdateCommunity } from './CommunityForms/UpdateCommunity';
import { useGetAllCommunities } from '../hooks/Communities/useGetAllCommunities';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';

const CommunitiesFeed = () => {
  const { user } = useUser();
  const { data: communities, isLoading: isCommunitiesLoading } =
    useGetAllCommunities();
  const {
    data: userStatusData,
    error: userStatusError,
    isLoading: userStatusIsLoading,
  } = useUserCommunitiesStatus(user?.id ?? DEFAULT_USER_ID);

  const userStatus: UserCommunitiesStatus = useMemo(() => {
    return userStatusError || userStatusIsLoading ? {} : userStatusData ?? {};
  }, [userStatusData]);

  const [userCommunitiesStatus, setUserCommunitiesStatus] =
    useState<UserCommunitiesStatus>(userStatus);

  useEffect(() => {
    setUserCommunitiesStatus(userStatus);
  }, [userStatusData]);

  const [allCommunitiesDisplay, setAllCommunitiesDisplay] = useState<
    Community[]
  >(communities ?? []);
  const [filteredCommunities, setFilteredCommunities] = useState(
    allCommunitiesDisplay,
  );
  const [searchValue, setSearchValue] = useState<string>('');

  const options = useMemo(
    () => allCommunitiesDisplay.map((community) => community.title),
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
            community.title.toLowerCase().includes(value),
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
    const memberStatus = [UserStatus.ACTIVE, UserStatus.MANAGER];
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

  const handleAddClick = (_event: React.MouseEvent) => {
    setIsCreateOpen(true);
  };

  return (
    <Box
      sx={{
        minWidth: 370,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <PageHeader title={'Communities'} />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'cetner',
          flexDirection: 'column',
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
        />
      </Box>
      {isCreateOpen && (
        <CreateCommunity
          user={user?.id ?? DEFAULT_USER_ID}
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
      <PageLoader isLoading={isCommunitiesLoading} paddingTop={5} />
      <FeedList>
        {filteredCommunities.map((community, index) => (
          <CommunityCard
            key={index}
            community={community}
            userId={user?.id ?? DEFAULT_USER_ID}
            handleClickOnEdit={handleClickOnEdit}
            userStatusIsLoading={userStatusIsLoading}
            userStatus={userCommunitiesStatus[community.id]}
          />
        ))}
      </FeedList>
      <AddNewButton
        handleAddClick={handleAddClick}
        tooltipText="Create a new community"
      />
    </Box>
  );
};

export { CommunitiesFeed };
