import { flatten, groupBy } from 'lodash';
import { useLocation } from 'react-router-dom';
import { Add, Menu as MenuIcon, MoreVert } from '@mui/icons-material';
import React, { MouseEvent, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { Community, Ride } from '@communecar/types';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { useUser } from '../../hooks/Users/useUser';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { RidesList } from '../../Components/Rides/RideList/RideList';
import { DEFAULT_USER_ID } from '../../apis/utils/defaultConst';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';
import { PageLoader } from '../../Components/PageLoader/PageLoader';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';
import { useGetUserRidesStatus } from '../../hooks/Rides/useGetUserRidesStatus';
import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { useGetAllUserCommunities } from '../../hooks/Communities/useGetAllUserCommunities';

const HomePage: React.FC = () => {
  const { user } = useUser();

  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [joinRideDialogOpened, setJoinRideDialogOpened] = useState(false);
  const [createRideOpen, setIsCreateRideOpen] = useState(false);

  const { data: communitiesData, isLoading: isLoadingCommunities } =
    useGetAllCommunities();
  const { data: userCommunitiesData, isLoading: isLoadingUserCommunities } =
    useGetAllUserCommunities(user!.id);
  const { data: ridesData, isLoading: isLoadingRides } = useGetAllRides();
  const { data: statuses } = useGetUserRidesStatus(user?.id ?? DEFAULT_USER_ID);

  const location = useLocation();
  const communityId = location.state?.communityId;

  const [selectedCommunityId, setSelectedCommunityId] = useState(communityId);

  const communities = useMemo(() => {
    if (isLoadingCommunities || isLoadingRides) {
      return [];
    }

    const groupedRides = groupBy(ridesData ?? [], 'communityName');
    return userCommunitiesData
      ? userCommunitiesData.map((community: Community) => ({
          ...community,
          rides: groupedRides[community.title] ?? [],
        }))
      : [];
  }, [userCommunitiesData, ridesData, isLoadingCommunities, isLoadingRides]);

  const ChangeSelectedTab = (
    _: MouseEvent<HTMLElement>,
    newTab: 'communities' | 'rides',
  ) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };

  return (
    <Page>
      <Menu
        MenuButton={
          <MainMenuButton color="primary">
            <MenuIcon />
          </MainMenuButton>
        }
      />
      <Map
        focusLocation={selectedRide?.startLocation}
        markers={
          flatten(
            communities.map((community) =>
              community.rides.map((ride: Ride) => ({
                geocode: ride.startLocation,
                popUp: `${ride.driver.firstName} ${ride.driver.lastName} going to ${ride.destinationName}`,
              })),
            ),
          ) as MarkerInfo[]
        }
      />
      <BottomDrawer>
        <Box style={{ margin: '2%' }}>
          <ToggleButtonGroup
            color="primary"
            value={selectedTab}
            exclusive
            onChange={ChangeSelectedTab}
          >
            <ToggleButton value={'communities'}>My Communities</ToggleButton>
            <ToggleButton value={'rides'}>My Rides</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <PageLoader
          isLoading={
            isLoadingCommunities || isLoadingRides || isLoadingUserCommunities
          }
        />
        {selectedTab === 'communities' && (
          <CommunityList
            communities={communities}
            setSelectedRide={setSelectedRide}
            communityId={selectedCommunityId}
            joinRideDialogOpened={joinRideDialogOpened}
            setSelectedCommunityId={setSelectedCommunityId}
            setJoinRideDialogOpened={setJoinRideDialogOpened}
          />
        )}
        {selectedTab === 'rides' && (
          <>
            <Box display={'flex'} justifyContent={'space-between'}>
              <IconButton>
                <MoreVert />
              </IconButton>
              <IconButton onClick={() => setIsCreateRideOpen(true)}>
                <Add />
              </IconButton>
            </Box>
            <RidesList
              rides={ridesData ?? []}
              userRideStatus={statuses ?? {}}
              setSelectedRide={setSelectedRide}
              communities={communitiesData ?? []}
              isCreateRideDialog={createRideOpen}
              userCommunities={userCommunitiesData ?? []}
              setIsCreateRideDialogOpen={setIsCreateRideOpen}
            />
          </>
        )}
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
