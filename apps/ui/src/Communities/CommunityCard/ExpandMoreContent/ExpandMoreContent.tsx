import { Box, Typography } from '@mui/material';
import { Location, User } from '@communecar/types';
import { UserAvatarChips } from '../../../Components/UserAvatar/userAvatarChips';

export interface ExpandMoreContentProps {
  communityLocation?: Location;
  communityOwners: User[];
}

const ExpandMoreContent: React.FC<ExpandMoreContentProps> = ({
  communityLocation,
  communityOwners,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'baseline',
        }}
      >
        <Typography variant="subtitle2" sx={{ marginRight: '0.5rem' }}>
          Base Location
        </Typography>
        <Typography variant="body2">
          {communityLocation?.name ?? 'No Base Location'}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" sx={{ marginRight: '0.5rem' }}>
          Managers
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}
        >
          {communityOwners.map((owner) => (
            <UserAvatarChips user={owner} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export { ExpandMoreContent };
