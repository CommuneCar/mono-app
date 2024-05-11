import React, { useEffect, useState } from 'react';
import { flatten, groupBy } from 'lodash';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import {
  useGetAllRides,
  useGetAllCommunities,
} from '../../hooks/Communities/useGetAllCommunities';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>('communities');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | undefined>();
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const baseCommunities = await useGetAllCommunities();
      const baseRides = await useGetAllRides();

      const groupedRides = groupBy(baseRides, 'communityName');
      const communitiesWithRides = baseCommunities.map((community) => ({
        ...community,
        rides: groupedRides[community.name] ?? [],
      }));

      setCommunities(communitiesWithRides);
    }

    fetchData();
  }, []);

  const ChangeSelectedTab = (
    _: MouseEvent<HTMLElement>,
    newTab: 'communities' | 'rides',
  ) => {
    if (newTab !== null) setSelectedTab(newTab);
  };

  return (
    <Page>
      <Menu isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <Map
        focusLocation={selectedRide?.startLocation}
        markers={
          flatten(
            communities.map((community) =>
              community.rides.map((ride) => ({
                geocode: ride.startLocation,
                popUp: `${ride.driver} going to ${ride.destinationName}`,
              })),
            ),
          ) as MarkerInfo[]
        }
      />
      <MainMenuButton color="primary" onClick={() => setIsProfileOpen(true)}>
        <MenuIcon />
      </MainMenuButton>
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
          {selectedTab === 'communities' && (
            <CommunityList
              communities={communities}
              setSelectedRide={setSelectedRide}
            />
          )}
          {selectedTab === 'rides' && <>something will be here :)</>}
        </>
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
