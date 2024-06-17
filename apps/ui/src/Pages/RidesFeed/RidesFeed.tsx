import { isEmpty } from 'lodash';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { Page, PageHeaderBar } from '../HomePage/styles';
import { UserRidesStatus } from '../../types/ride-user-type';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import { PageLoader } from '../../Components/PageLoader/PageLoader';
import { RidesList } from '../../Components/Rides/RideList/RideList';

export interface RidesFeedProps {
  rides: Ride[];
  communities: Community[];
  userCommunities: Community[];
  userRidesStatus: UserRidesStatus;
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const RidesFeed = ({
  rides,
  communities,
  userRidesStatus,
  userCommunities,
  setSelectedRide,
}: RidesFeedProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Page>
      <PageHeaderBar display={'flex'} justifyContent={'space-between'}>
        <PageHeader title={'rides'} />
        <IconButton onClick={() => setIsDialogOpen(true)}>
          <Add />
        </IconButton>
      </PageHeaderBar>
      <PageLoader isLoading={isEmpty(rides) || isEmpty(communities)} />
      <RidesList
        rides={rides}
        communities={communities}
        userRideStatus={userRidesStatus}
        isCreateRideDialog={isDialogOpen}
        setSelectedRide={setSelectedRide}
        userCommunities={userCommunities}
        setIsCreateRideDialogOpen={setIsDialogOpen}
      />
    </Page>
  );
};

export { RidesFeed };
