import { groupBy } from 'lodash';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { MouseEvent, useMemo, useState } from 'react';
import { Box, Drawer, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Map from '../../Components/Map';
import { MainMenuButton, Page } from './styles';
import { CommunityList } from '../../Components/community-list/community-list';

import {
  useGetAllRides,
  useGetAllCommunities,
} from '../../hooks/Communities/useGetAllCommunities';
import { BottomDrawer } from '../../Components/bottom-drawer/bottom-drawer';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const communities = useMemo(() => {
    const base = useGetAllCommunities();
    const baseRides = useGetAllRides();

    const groupedRides = groupBy(baseRides, 'communityName');

    return base.map((com) => ({ ...com, rides: groupedRides[com.name] ?? [] }));
  }, []);

  const ChangeSelectedTab = (
    _: MouseEvent<HTMLElement>,
    newTab: 'communities' | 'rides',
  ) => {
    if (newTab !== null) setSelectedTab(newTab);
  };

  return (
    <Page>
      <Drawer open={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        this will be a profile
      </Drawer>

      <Box style={{ height: '66%' }}>
        <Map
          destinations={[]}
          mapStyle={'regular'}
          startPoint={[34.781769, 32.079444]}
        />
        <MainMenuButton color="primary" onClick={() => setIsProfileOpen(true)}>
          <MenuIcon />
        </MainMenuButton>
      </Box>
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
            <CommunityList communities={communities} />
          )}
          {selectedTab === 'rides' && <>something will be here :)</>}
        </>
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
