import React from 'react';
import { DialogContentText, Typography, Box } from '@mui/material';
import UserLogo from '../UserAvatar/UserAvatar';
import { DRIVER_ITEM_COLOR } from '../UserAvatar/consts';

interface DriverContentItemProps {
  header: string;
  text: string;
}

const DriverContentItem: React.FC<DriverContentItemProps> = ({
  header,
  text,
}) => {
  return (
    <DialogContentText display="flex" alignItems="center">
      <Box component="span" sx={{ mr: 1 }}>
        <Typography variant="subtitle1">{header}</Typography>
      </Box>
      <UserLogo name={text} bgColor={DRIVER_ITEM_COLOR} />
    </DialogContentText>
  );
};

export { DriverContentItem };
