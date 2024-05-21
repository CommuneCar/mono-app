import React from 'react';
import { DialogContentText, Typography, Box } from '@mui/material';
import { UserLogo } from '../../UserAvatar/UserAvatar';
import { DRIVER_ITEM_COLOR } from '../../UserAvatar/consts';

interface DriverContentItemProps {
  phoneNumber: string;
  text: string;
  avatarUrl?: string;
}

const DriverContentItem: React.FC<DriverContentItemProps> = ({
  text,
  phoneNumber,
  avatarUrl,
}) => {
  return (
    <DialogContentText display="flex" alignItems="center">
      <Box component="span" sx={{ minWidth: '100px', mr: 1 }}>
        <Typography variant="subtitle1">Driver:</Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <UserLogo
          pic={avatarUrl ?? ''}
          name={text}
          bgColor={DRIVER_ITEM_COLOR}
        />
        <Typography variant="caption">{phoneNumber}</Typography>
      </Box>
    </DialogContentText>
  );
};

export { DriverContentItem };
