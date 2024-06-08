import { Avatar, Box, Chip, Tooltip, Typography } from '@mui/material';
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
          flexDirection: 'row',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" sx={{ marginRight: '0.5rem' }}>
          Managers
        </Typography>
        {communityOwners.map((owner) => (
          <Tooltip title={`${owner.firstName} ${owner.lastName}`}>
            <Chip
              avatar={
                <Avatar
                  alt="Natacha"
                  src={
                    owner.avatarUrl ??
                    'https://guzwjncnbuiiazedbuis.supabase.co/storage/v1/object/public/profile-images/Screenshot%202023-09-08%20at%2020.33.27.png'
                  }
                />
              }
              label={`${owner.firstName} ${owner.lastName}`}
              variant="outlined"
            />
          </Tooltip>
        ))}
      </Box>
    </>
  );
};

export { ExpandMoreContent };
