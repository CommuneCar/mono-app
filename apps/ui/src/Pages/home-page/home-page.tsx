import React, { MouseEvent, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { Page } from './styles';
import { communities } from './mock';
import Map from '../../Components/Map';
import { CommunityList } from '../../Components/community-list/community-list';

const HomePage: React.FC = () => {
  const [fullSCreenRides, setFullScreenRides] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'communities' | 'rides'>(
    'communities',
  );

  const ChangeSelectedTab = (
    _: MouseEvent<HTMLElement>,
    newTab: 'communities' | 'rides',
  ) => {
    setSelectedTab(newTab);
  };

  return (
    <Page>
      {!fullSCreenRides && (
        <div style={{ height: '65%' }}>
          <Map
            mapStyle={'regular'}
            startPoint={[34.781769, 32.079444]}
            destinations={[]}
          />
        </div>
      )}
      <div
        style={{
          height: fullSCreenRides ? '100%' : '35%',
          overflow: 'auto',
          border: 'solid 1px grey',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          transition: 'ease-in-out',
        }}
        onScroll={(event) => {
          const { scrollTop } = event.target as HTMLDivElement;

          if (scrollTop > 150 && !fullSCreenRides) {
            setFullScreenRides(true);
          }

          if (scrollTop === 0) {
            setFullScreenRides(false);
          }
        }}
      >
        <div style={{ margin: '2%' }}>
          <ToggleButtonGroup
            color="primary"
            value={selectedTab}
            exclusive
            onChange={ChangeSelectedTab}
          >
            <ToggleButton value={'communities'}>My Communities</ToggleButton>
            <ToggleButton value={'rides'}>My Rides</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {selectedTab === 'communities' && (
          <CommunityList communities={communities} />
        )}
        {selectedTab === 'rides' && <>something will be here :)</>}
      </div>
    </Page>
  );
};

export { HomePage };
