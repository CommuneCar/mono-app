import Box from '@mui/material/Box';
import RideCard, { RidesCardProps } from './RideCard';

export interface RidesFeedProps {
  rides: RidesCardProps[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {rides.map((ride) => (
        <RideCard
          communityName={ride.communityName}
          driver={ride.driver}
          departureTime={ride.departureTime}
          startLocation={ride.startLocation}
          destination={ride.destination}
          png={ride.png}
        />
      ))}
    </Box>
  );
};

export default RidesFeed;
