import { Add } from '@mui/icons-material';
import { groupBy, mapValues } from 'lodash';
import { Box, IconButton } from '@mui/material';
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
import { MyEntitiesFilterButton } from './MyEntitiesFilterButton';
import { CreateCommunity } from './CommunityForms/CreateCommunity';
import { UpdateCommunity } from './CommunityForms/UpdateCommunity';
import { useGetAllCommunities } from '../hooks/Communities/useGetAllCommunities';
import { useUserCommunitiesStatus } from '../hooks/Communities/useUserCommunitiesStatus';
import { Page } from '../Pages/HomePage/styles';

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
    <Page>
      <PageHeader title={'Communities'} />
      <Box
        sx={{
          px: '5%',
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
        <Box display={'flex'} justifyContent={'space-between'}>
          <MyEntitiesFilterButton
            lable={'My Communities'}
            setShowMyEntities={setShowMyCommunities}
            showMyEntities={showMyCommunities}
            filter={handleMyCommunitiesFilter}
          />
          <IconButton onClick={handleAddClick}>
            <Add />
          </IconButton>
        </Box>
      </Box>
      {isCreateOpen && (
        <CreateCommunity
          userId={user?.id ?? DEFAULT_USER_ID}
          isOpen={isCreateOpen}
          handleClose={handleClose}
          onCreate={handleNewCommunity}
          onCreateConnections={refetchCommunities}
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
    </Page>
  );
};

export { CommunitiesFeed };
