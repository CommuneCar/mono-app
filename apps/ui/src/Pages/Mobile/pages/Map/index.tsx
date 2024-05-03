import React from 'react';

import { Map } from '../../../../Components/Map/Map';
import { Page } from '../../../../common/styles/page';

const MapPage: React.FC = () => {
  return (
    <Page className="full-viewport">
      <Map shouldShowSearch={false} />
    </Page>
  );
};

export { MapPage };
