import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { Location, User } from '@communecar/types';

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
          flexDirection: 'row',
          justifyContent: 'left',
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
          flexDirection: 'row',
          justifyContent: 'left',
        }}
      >
        <Typography variant="subtitle2" sx={{ marginRight: '0.5rem' }}>
          Managers
        </Typography>
        {communityOwners.map((owner) => (
          <Tooltip
            title={`${owner.firstName} ${owner.lastName} \n${owner.phone}`}
          >
            <Avatar src={owner.avatarUrl} />
          </Tooltip>
        ))}
      </Box>
    </>
  );
};

export { ExpandMoreContent };
