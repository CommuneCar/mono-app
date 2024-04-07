import Box from '@mui/material/Box';
import CommunityCard, { CommunityCardProps } from './CommunityCard';

export interface CommunitiesFeedProps {
  communities: CommunityCardProps[];
}

const RidesFeed = ({ communities }: CommunitiesFeedProps) => {
  return (
    <Box>
      {communities.map((community) => (
        <CommunityCard
          name={community.name}
          description={community.description}
          png={community.png}
        />
      ))}
    </Box>
  );
};

export default RidesFeed;
