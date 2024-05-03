import React from 'react';
import { CssBaseline } from '@mui/material';

import logo from '../../assets/logo-no-title.png';

import { Map } from '../../Components/Map/Map';
import { Page } from '../../common/styles/page';

const Desktop: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Page>
        <Map shouldShowSearch={false} />

        <Page
          sx={{
            width: '20vw',
            backgroundColor: 'white',
            borderTopRightRadius: '18px',
            borderBottomRightRadius: '18px',
          }}
        >
          <img src={logo} style={{ height: '30%' }} />
        </Page>
      </Page>
    </>
  );
};

export { Desktop };
