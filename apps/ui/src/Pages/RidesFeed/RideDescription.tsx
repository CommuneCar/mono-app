import Typography from '@mui/material/Typography';

import { Driver } from '@communecar/types/src/Driver';

import defaultTheme from '../../themes/default';
import React from 'react';

export interface RideDescriptionProps {
  driver: Driver;
  departureTime: Date;
  startLocation: string;
  destination: string;
}

const RideDescription = ({
  driver,
  departureTime,
  startLocation,
  destination
}: RideDescriptionProps) => {
  const currentDate = new Date();

  const minutesToDeparture = Math.floor(
    (departureTime.getTime() - currentDate.getTime()) / (1000 * 60),
  );
  return (
    <Typography variant="subtitle1">
      {driver.name} is leaving in{' '}
      <Typography
        variant="subtitle1"
        component="span" // Use span instead of the default block element
        fontWeight="bold"
        sx={{ color: defaultTheme.palette.success.main, display: 'inline' }}
      >
        {minutesToDeparture}
      </Typography>{' '}
      minutes from {startLocation} to {destination}
    </Typography>
  );
};

export default RideDescription;
