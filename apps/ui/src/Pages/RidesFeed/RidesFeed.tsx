import { Add } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { Page } from '../HomePage/styles';
import { RidesList } from '../../Components/Rides/RideList';
import { UserRidesStatus } from '../../types/ride-user-type';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import { PageLoader } from '../../Components/PageLoader/PageLoader';

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
    <Page sx={{ width: '100%' }}>
      <PageLoader isLoading={!rides || !communities} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <PageHeader title={'rides'} />
        <IconButton onClick={() => setIsDialogOpen(true)}>
          <Add />
        </IconButton>
      </Box>
      <RidesList
        rides={rides}
        openDialog={isDialogOpen}
        communities={communities}
        setOpenDialog={setIsDialogOpen}
        userRideStatus={userRidesStatus}
        setSelectedRide={setSelectedRide}
        userCommunities={userCommunities}
      />
    </Page>
  );
};

export { RidesFeed };
