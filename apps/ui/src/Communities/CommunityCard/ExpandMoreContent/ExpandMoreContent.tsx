import { Box, Typography } from '@mui/material';
import { Location, User } from '@communecar/types';
import { UserAvatarChips } from '../../../Components/UserAvatar/userAvatarChips';
import { ExpandMoreFieldBox } from './expandMoreFieldBox.styled';
import { isEmpty } from 'lodash';

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
      <ExpandMoreFieldBox sx={{ marginBottom: '1rem', marginTop: '0rem' }}>
        <Typography variant="subtitle2" sx={{ marginRight: '0.5rem' }}>
          Base Location
        </Typography>
        <Typography variant="body2" sx={{ textAlign: '-webkit-auto' }}>
          {communityLocation?.name ?? 'No Base Location'}
        </Typography>
      </ExpandMoreFieldBox>
      {!isEmpty(communityOwners) && (
        <ExpandMoreFieldBox>
          <Typography variant="subtitle2" sx={{ marginBottom: '0.5rem' }}>
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
        </ExpandMoreFieldBox>
      )}
    </>
  );
};

export { ExpandMoreContent };
