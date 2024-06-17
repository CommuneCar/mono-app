import { Avatar, AvatarGroup } from '@mui/material';
import { COLORS } from '../../themes/default/consts';

export interface CommunityMembersDisplayProps {
  pictures?: string[];
}

const CommunityMembersDisplay: React.FC<CommunityMembersDisplayProps> = ({
  pictures,
}) => {
  return (
    <AvatarGroup
      max={4}
      sx={{ color: COLORS.PRIMARY }}
      renderSurplus={(surplus) => (
        <Avatar
          sx={{
            color: COLORS.TEXT_PRIMARY,
            bgcolor: COLORS.PRIMARY,
          }}
        >
          +{surplus}
        </Avatar>
      )}
    >
      {pictures?.map((picture, index) => {
        return (
          <Avatar
            key={index}
            sx={{
              color: COLORS.TEXT_PRIMARY,
              bgcolor: COLORS.PRIMARY,
            }}
            src={picture}
          />
        );
      })}
    </AvatarGroup>
  );
};

export { CommunityMembersDisplay };
