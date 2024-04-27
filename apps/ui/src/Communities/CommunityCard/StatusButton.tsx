import { Box, IconButton, Tooltip } from '@mui/material';
import {
  AddRounded,
} from '@mui/icons-material';
import { UserStatus } from '@communecar/types';
import { useCallback } from 'react';
import { statusIcons } from '../../utils/communities/userStatusIcons';

export interface CommunityCardProps {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
  status?: UserStatus;
}

const StatusButton: React.FC<CommunityCardProps> = ({
  setJoined,
  status,
}) => {
  const renderIcon = useCallback(() => {
    if (status) {
      return statusIcons[status];
    } else {
      return <AddRounded />;
    }
  }, [status]);

  return (
    <Tooltip title={status ? status : 'Ask To Join'}>
      <Box>
      <IconButton
        onClick={() => setJoined((prev) => !prev)}
        disabled={status === UserStatus.REJECTED}
      >
        {renderIcon()}
      </IconButton>
      </Box>
    </Tooltip>
  );
};

export { StatusButton };
