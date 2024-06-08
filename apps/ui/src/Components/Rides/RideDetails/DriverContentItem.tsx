import React from 'react';
import { DialogContentText, Typography, Box, IconButton } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { UserLogo } from '../../UserAvatar/UserAvatar';
import { DRIVER_ITEM_COLOR } from '../../UserAvatar/consts';
import {handleWhatsAppClick} from './whatsapp'
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
        <Box display="flex" alignItems="center">
          <Typography variant="caption">{phoneNumber}</Typography>
          <IconButton
            aria-label="whatsapp"
            onClick={() => handleWhatsAppClick(phoneNumber)}
            sx={{ ml: -0.5, mt:'-4px' }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Box>
      </Box>
    </DialogContentText>
  );
};

export { DriverContentItem };
