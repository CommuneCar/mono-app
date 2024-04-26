import { IconButton, Tooltip } from '@mui/material';
import {
  AddRounded,
  BlockRounded,
  CheckRounded,
  HourglassEmptyRounded,
} from '@mui/icons-material';
import { UserStatus } from '@communecar/types';
import { useCallback } from 'react';

export interface CommunityCardProps {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
  status?: UserStatus;
}

const StatusButton: React.FC<CommunityCardProps> = ({
  setJoined,
  status,
}) => {

  const isBlocked = status === UserStatus.REJECTED;

  const renderIcon = useCallback(() => {
    if (status === UserStatus.APPROVED) {
      return <CheckRounded />;
    } else if (status === UserStatus.PENDING) {
      return <HourglassEmptyRounded />;
    } else if (isBlocked) {
      return <BlockRounded />;
    } else {
      return <AddRounded />;
    }
  }, [status]);

  return (
    <Tooltip title={status ? status : 'Ask To Join'}>
      <IconButton
        onClick={() => setJoined((prev) => !prev)}
        disabled={isBlocked}
      >
        {renderIcon()}
      </IconButton>
    </Tooltip>
  );
};

export { StatusButton };
