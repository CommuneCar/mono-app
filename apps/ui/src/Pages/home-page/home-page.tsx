import React, { MouseEvent, useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Drawer, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { communities } from './mock';
import Map from '../../Components/Map';
import { BottomDrawer, MainMenuButton, Page } from './styles';
import { CommunityList } from '../../Components/community-list/community-list';

const HomePage: React.FC = () => {
  const [fullScreenRides, setFullScreenRides] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      {!fullScreenRides && (
        <Box style={{ height: '66%' }}>
          <Map
            destinations={[]}
            mapStyle={'regular'}
            startPoint={[34.781769, 32.079444]}
          />
          <MainMenuButton
            color="primary"
            onClick={() => setIsProfileOpen(true)}
          >
            <MenuIcon />
          </MainMenuButton>
        </Box>
      )}
      <BottomDrawer
        sx={{ height: fullScreenRides ? '100%' : '34%' }}
        onScroll={(event) => {
          const { scrollTop } = event.target as HTMLDivElement;

          if (scrollTop > 150 && !fullScreenRides) {
            setFullScreenRides(true);
          }

          if (scrollTop === 0) {
            setFullScreenRides(false);
          }
        }}
      >
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
      </BottomDrawer>
    </Page>
  );
};

export { HomePage };
