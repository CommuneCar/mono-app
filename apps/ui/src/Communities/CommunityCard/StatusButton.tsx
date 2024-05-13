import { Box, IconButton, Tooltip } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { UserStatus } from '@communecar/types';
import { useCallback } from 'react';
import { statusIcons } from '../../utils/communities/userStatusIcons';

export interface CommunityCardProps {
  onJoinRequest: () => void;
  status?: UserStatus;
}

const StatusButton: React.FC<CommunityCardProps> = ({
  onJoinRequest,
  status,
}) => {
  const renderIcon = useCallback(() => {
    if (status) {
      return statusIcons[status];
    } else {
      return <AddRounded />;
    }
  }, [status]);

  const isDisabled =
    status === UserStatus.REJECTED || status === UserStatus.MANAGER;

  return (
    <Tooltip title={status ? status : 'Ask To Join'}>
      <Box>
        <IconButton onClick={onJoinRequest} disabled={isDisabled}>
          {renderIcon()}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export { StatusButton };
