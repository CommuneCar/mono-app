import { Ride } from '@communecar/types';
import { flatten, groupBy } from 'lodash';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { MouseEvent, useMemo, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { Map, MarkerInfo } from '../../Components/Map/Map';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import { useGetAllCommunities } from '../../hooks/Communities/useGetAllCommunities';
import { useGetAllRides } from '../../hooks/Rides/useGetAllRides';
import { RidesList } from '../../Components/RidesList/RidesList';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );

  const [selectedRide, setSelectedRide] = useState<Ride>();

  const rides = useMemo(() => {
    const baseRides = useGetAllRides();
    const activeRides = baseRides.filter(
      (ride) => ride.departureTime.getTime() > new Date().getTime(),
    );
    return activeRides.sort(
      (a, b) => a.departureTime.getTime() - b.departureTime.getTime(),
    );
  }, []);

  const communities = useMemo(() => {
    const baseCommunities = useGetAllCommunities();
    const baseRides = useGetAllRides();

    const groupedRides = groupBy(baseRides, 'communityName');

    return baseCommunities.map((community) => ({
      ...community,
      rides: groupedRides[community.name] ?? [],
    }));
  }, []);

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
          {selectedTab === 'communities' && (
            <CommunityList
              communities={communities}
              setSelectedRide={setSelectedRide}
            />
          )}
          {selectedTab === 'rides' && (
            <RidesList rides={rides} setSelectedRide={setSelectedRide} />
          )}
        </>
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
