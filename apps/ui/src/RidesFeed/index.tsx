import Box from '@mui/material/Box';
import RideCard, { RidesCardProps } from './RideCard';

export interface RidesFeedProps {
  rides: RidesCardProps[];
}

const RidesFeed = ({ rides }: RidesFeedProps) => {
  return (
    <Box>
      {rides.map((ride) => (
        <RideCard
          communityName={ride.communityName}
          description={ride.description}
          png={ride.png}
        />
      ))}
    </Box>
  );
};

export default RidesFeed;
