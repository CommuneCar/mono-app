import { isEmpty } from 'lodash';
import { Add, Info as InfoIcon } from '@mui/icons-material';
import { Box, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

import { Community, Gender, Ride } from '@communecar/types';

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
  const [genderFilter, setGenderFilter] = useState<Gender | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const changeGenderFilter = (_: MouseEvent<HTMLElement>, newGender: Gender | null) => {
    setGenderFilter(newGender);
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
        <ToggleButtonGroup
          color="primary"
          value={genderFilter}
          exclusive
          onChange={changeGenderFilter}
          sx={{ padding: '0' }} // Reset padding to ensure alignment
        >
          <ToggleButton value={Gender.MALE} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>Male</ToggleButton>
          <ToggleButton value={Gender.FEMALE} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>Female</ToggleButton>
        </ToggleButtonGroup>
        <Tooltip title="Filter for rides that are limited to a specific gender">
          <InfoIcon
            color="action"
            sx={{ ml: 1, cursor: 'pointer' }}
          />
        </Tooltip>
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
