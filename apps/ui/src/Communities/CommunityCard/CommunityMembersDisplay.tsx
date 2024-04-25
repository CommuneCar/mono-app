import { Avatar, AvatarGroup } from '@mui/material';

export interface CommunityMembersDisplayProps {
  pictures?: string[];
  total: number;
}

const CommunityMembersDisplay: React.FC<CommunityMembersDisplayProps> = ({
  pictures,
  total,
}) => {
  return (
    <AvatarGroup max={4}>
      {pictures?.map((picture) => {
        return <Avatar src={picture} color="primary" />;
      })}
    </AvatarGroup>
  );
};

export { CommunityMembersDisplay };
