import React, { MouseEvent, useMemo, useState } from 'react';
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { flatten, groupBy } from 'lodash';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';
import { Community, Ride } from '@communecar/types';
import { useLocation } from 'react-router-dom';
import { RidesList } from '../../Components/Rides/RideList';
import { RideDetails } from '../../Components/Rides/RideDetails';
import { JoinRideDialog } from '../../Components/Rides/JoinRide';
import { PageLoader } from '../../Components/PageLoader/PageLoader';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [selectedRide, setSelectedRide] = useState<Ride>();
  const [joinRideDialogOpened, setJoinRideDialogOpened] = useState(false);

  const { data: communitiesData, isLoading: isLoadingCommunities } =
    useGetAllCommunities();
  const { data: ridesData, isLoading: isLoadingRides } = useGetAllRides();

  const location = useLocation();
  const communityId = location.state?.communityId;

  const [selectedCommunityId, setSelectedCommunityId] = useState(communityId);

  const communities = useMemo(() => {
    if (isLoadingCommunities || isLoadingRides) {
      return [];
    }

    const groupedRides = groupBy(ridesData ?? [], 'communityName');
    return communitiesData
      ? communitiesData.map((community: Community) => ({
          ...community,
          rides: groupedRides[community.title] ?? [],
        }))
      : [];
  }, [communitiesData, ridesData, isLoadingCommunities, isLoadingRides]);

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
                popUp: `${ride.driver.name} going to ${ride.destinationName}`,
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
        <PageLoader isLoading={isLoadingCommunities || isLoadingRides} />
        {selectedTab === 'communities' && (
          <CommunityList
            communities={communities}
            setSelectedRide={setSelectedRide}
            communityId={selectedCommunityId}
            setSelectedCommunityId={setSelectedCommunityId}
            joinRideDialogOpened={joinRideDialogOpened}
            setJoinRideDialogOpened={setJoinRideDialogOpened}
          />
        )}
        {selectedTab === 'rides' && (
          <RidesList
            setSelectedRide={setSelectedRide}
            joinRideDialogOpened={joinRideDialogOpened}
            setJoinRideDialogOpened={setJoinRideDialogOpened}
            rides={ridesData ?? []}
            communities={communitiesData ?? []}
          />
        )}
        {!!selectedRide && (
          <RideDetails
            ride={selectedRide}
            isOpen={!!selectedRide}
            setSelectedRide={setSelectedRide}
          />
        )}
        <JoinRideDialog
          isOpen={joinRideDialogOpened}
          setOpen={setJoinRideDialogOpened}
        />
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
