import { Box, IconButton, Tooltip } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { UserStatus } from '@communecar/types';
import { useCallback } from 'react';
import { statusIcons } from '../../utils/communities/userStatusIcons';

export interface StatusButtonProps {
  onRequest: () => void;
  status?: UserStatus;
}

const StatusButton: React.FC<StatusButtonProps> = ({ onRequest, status }) => {
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
        <IconButton onClick={onRequest} disabled={isDisabled}>
          {renderIcon()}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export { StatusButton };
