import dayjs from 'dayjs';
import { Ride } from '@communecar/types';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';

import { RideCard } from '../RideCard/RideCard';

dayjs.extend(relativeTime);

interface RideListProps {
  rides: Ride[];
  setSelectedRide: Dispatch<SetStateAction<Ride | undefined>>;
}

const RidesList: React.FC<RideListProps> = ({ rides, setSelectedRide }) => {
  return (
    <>
      {rides.map((ride, index) => (
        <Box key={index} onClick={() => setSelectedRide(ride)}>
          <RideCard
            driver={ride.driver.name}
            text={`going from ${ride.startLocationName} to ${ride.destinationName} ${dayjs(Date.now()).to(dayjs(ride.departureTime))}`}
          />
        </Box>
      ))}
    </>
  );
};

export { RidesList };
