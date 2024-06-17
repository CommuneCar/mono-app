import { isEmpty } from 'lodash';
import { Add} from '@mui/icons-material';
import { Box, IconButton, FormControlLabel, Switch } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import { Community, Ride } from '@communecar/types';

import { Page } from '../HomePage/styles';
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
  const [genderFilter, setGenderFilter] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toggleGenderFilter = () => {
    setGenderFilter((prev) => !prev);
  };
  return (
    <Page>
      <Box display={'flex'} justifyContent={'space-between'} px={2}>
        <PageHeader title={'rides'} />
        <IconButton onClick={() => setIsDialogOpen(true)}>
          <Add />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, px: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={genderFilter}
              onChange={toggleGenderFilter}
            />
          }
          label="Rides limited to my Gender"
        />
      </Box>
      <PageLoader isLoading={isEmpty(rides) || isEmpty(communities)} />
      <RidesList
        rides={rides}
        communities={communities}
        userRideStatus={userRidesStatus}
        isCreateRideDialog={isDialogOpen}
        setSelectedRide={setSelectedRide}
        userCommunities={userCommunities}
        setIsCreateRideDialogOpen={setIsDialogOpen}
        genderFilter={genderFilter}
      />
    </Page>
  );
};

export { RidesFeed };
