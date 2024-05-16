import React, { MouseEvent, useMemo, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { flatten, groupBy } from 'lodash';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';
import { Ride } from '@communecar/types';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [selectedRide, setSelectedRide] = useState<Ride>();

  const { data: communitiesData, isLoading: isLoadingCommunities } =
    useGetAllCommunities();
  const { data: ridesData, isLoading: isLoadingRides } = useGetAllRides();

  const location = useLocation();
  const communityId = location.state?.communityId;

  const [selectedCommunityId, setSelectedCommunityId] = useState(communityId);

  const communities = useMemo(() => {
    if (isLoadingCommunities || isLoadingRides) {
      return []; // Return an empty array or a loading state until data is available
    }

    const groupedRides = groupBy(ridesData, 'communityName');
    return communitiesData
      ? communitiesData.map((community) => ({
          ...community,
          rides: groupedRides[community.name] ?? [],
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
              community.rides.map((ride) => ({
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
        {selectedTab === 'communities' && (
          <CommunityList
            communities={communities}
            setSelectedRide={setSelectedRide}
            communityId={selectedCommunityId}
            setSelectedCommunityId={setSelectedCommunityId}
          />
        )}
        {selectedTab === 'rides' && <div>Something will be here :)</div>}
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
