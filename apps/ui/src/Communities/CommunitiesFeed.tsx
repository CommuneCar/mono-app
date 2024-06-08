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
import { UserCommunitiesStatus } from '../types/community-type';
import { DEFAULT_USER_ID } from '../apis/utils/defaultConst';
import { PageLoader } from '../Components/PageLoader/PageLoader';
import { useGetAllCommunities } from '../hooks/Communities/useGetAllCommunities';

const CommunitiesFeed = () => {
  const { user } = useUser();
  const userId = useMemo(() => user?.id ?? DEFAULT_USER_ID, [user]);

  const {
    data: communities,
    isLoading: isCommunitiesLoading,
    refetch: refetchCommunities,
  } = useGetAllCommunities();
  const {
    data: userStatusData,
    error: userStatusError,
    isLoading: userStatusIsLoading,
    refetch: refetchUserStatus,
  } = useUserCommunitiesStatus(userId);

  const userStatus: UserCommunitiesStatus = useMemo(() => {
    return userStatusError || userStatusIsLoading ? {} : userStatusData ?? {};
  }, [userStatusData]);

  const [userCommunitiesStatus, setUserCommunitiesStatus] =
    useState<UserCommunitiesStatus>(userStatus);
  const [allCommunitiesDisplay, setAllCommunitiesDisplay] = useState<
    Community[]
  >(communities ?? []);
  const [filteredCommunities, setFilteredCommunities] = useState(
    allCommunitiesDisplay,
  );
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (user) {
      refetchCommunities();
      refetchUserStatus();
    }
  }, [user, refetchCommunities, refetchUserStatus]);

  useEffect(() => {
    setAllCommunitiesDisplay(communities ?? []);
  }, [communities]);

  useEffect(() => {
    setUserCommunitiesStatus(userStatus);
  }, [userStatusData]);

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 370,
        maxWidth: 400,
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
          userId={user?.id ?? DEFAULT_USER_ID}
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
            userStatus={userCommunitiesStatus[community.id]}
            handleClickOnEdit={handleClickOnEdit}
            userStatusIsLoading={userStatusIsLoading}
            userId={user?.id ?? DEFAULT_USER_ID}
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
