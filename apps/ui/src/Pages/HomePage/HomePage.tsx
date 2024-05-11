import { Ride } from '@communecar/types';
import { flatten, groupBy } from 'lodash';
import { FilterAltOffRounded, Menu as MenuIcon } from '@mui/icons-material';
import React, { MouseEvent, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import { useLocation } from 'react-router-dom';
import { CommunityWithRides } from '../../Components/CommunityList/types';
import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );

  const [selectedRide, setSelectedRide] = useState<Ride>();

  const communities: CommunityWithRides[] = useMemo(() => {
    const baseCommunities = useGetAllCommunities();
    const baseRides = useGetAllRides();

    const groupedRides = groupBy(baseRides, 'communityName');

    return baseCommunities.map((community) => ({
      ...community,
      rides: groupedRides[community.name] ?? [],
    }));
  }, []);

  const location = useLocation();
  const communityId = location.state?.communityId;

  const ChangeSelectedTab = (
    _: MouseEvent<HTMLElement>,
    newTab: 'communities' | 'rides',
  ) => {
    if (newTab !== null) setSelectedTab(newTab);
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
        <>
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
          {communityId && selectedTab === 'communities' && (
            <Box>
              <IconButton sx={{ alignSelf: 'start' }}>
                <FilterAltOffRounded />
              </IconButton>
            </Box>
          )}
          {selectedTab === 'communities' && (
            <CommunityList
              communities={communities}
              setSelectedRide={setSelectedRide}
              communityId={communityId}
            />
          )}
          {selectedTab === 'rides' && <>something will be here :)</>}
        </>
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
