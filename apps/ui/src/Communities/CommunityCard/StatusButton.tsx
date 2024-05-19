import { Box, CircularProgress, IconButton, Tooltip } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { UserStatus } from '@communecar/types';
import { useMemo } from 'react';
import { statusIcons } from '../../utils/communities/userStatusIcons';

export interface StatusButtonProps {
  onRequest: () => void;
  status?: UserStatus;
  isLoading: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  onRequest,
  status,
  isLoading,
}) => {
  const renderIcon = useMemo(() => {
    if (status) {
      return statusIcons[status];
    } else {
      return <AddRounded />;
    }
  }, [status]);

  const isDisabled =
    isLoading ||
    status === UserStatus.REJECTED ||
    status === UserStatus.MANAGER;

  return (
    <Tooltip title={status ? status : 'Ask To Join'}>
      <Box>
        <IconButton onClick={onRequest} disabled={isDisabled}>
          {isLoading ? <CircularProgress /> : renderIcon}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export { StatusButton };
