import { groupBy } from 'lodash';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useSession } from '@supabase/auth-helpers-react';
import React, { MouseEvent, useMemo, useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Map } from '../../Components/Map/Map';
import { MainMenuButton, Page } from './styles';
import { Menu } from '../../Components/Menu/Menu';
import { BottomDrawer } from '../../Components/BottomDrawer/BottomDrawer';
import { CommunityList } from '../../Components/CommunityList/CommunityList';

import {
  useGetAllRides,
  useGetAllCommunities,
} from '../../hooks/Communities/useGetAllCommunities';

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const session = useSession();

  const userName = useMemo(
    () => session?.user?.email?.split('@')[0],
    [session],
  );

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
      <Menu isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
      <Map />
      <MainMenuButton color="primary" onClick={() => setIsProfileOpen(true)}>
        <MenuIcon />
      </MainMenuButton>
      <BottomDrawer>
        <>
          Hi there {userName}
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
