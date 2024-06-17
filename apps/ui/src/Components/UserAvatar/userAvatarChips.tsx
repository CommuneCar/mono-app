import { User } from '@communecar/types';
import { Avatar, Chip, Tooltip } from '@mui/material';
import { getUserFullName } from '../../utils/user/userUtils';

export interface UserAvatarChipsProps {
  user: User;
}

const UserAvatarChips: React.FC<UserAvatarChipsProps> = ({ user }) => {
  const fullName = getUserFullName(user);
  return (
    <Tooltip title={fullName}>
      <Chip
        sx={{ marginRight: '2px', borderRadius: '16px', marginBottom: '3px' }}
        avatar={<Avatar alt={fullName} src={user.avatarUrl} />}
        label={fullName}
        variant="outlined"
      />
    </Tooltip>
  );
};

export { UserAvatarChips };
