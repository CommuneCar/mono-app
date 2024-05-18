import React, { useState } from 'react';
import {
  DialogContentText,
  Box,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material';
import UserLogo from '../../UserAvatar/UserAvatar';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Rider } from '@communetypes/Rider';
import { getAvatarColour } from '../../UserAvatar/utils';

interface DriverContentItemProps {
  riders: Rider[] | undefined;
}

const RidersContentItem: React.FC<DriverContentItemProps> = ({ riders }) => {
  const [showRiders, setShowRiders] = useState(false);

  const toggleRidersList = () => {
    setShowRiders(!showRiders);
  };
  return (
    <Box>
      <DialogContentText
        onClick={toggleRidersList}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <Box component="span" sx={{ minWidth: '100px', mr: 1 }}>
          <Typography variant="subtitle1">Riders:</Typography>
        </Box>
        <IconButton>{showRiders ? <ExpandLess /> : <ExpandMore />}</IconButton>

        <Collapse in={showRiders}>
          {riders && riders.length > 0 ? (
            <Box display="flex" flexWrap="wrap" mt={2}>
              {riders.map((rider) => (
                <Box
                  key={rider.id}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  m={1}
                >
                  <UserLogo
                    name={rider.name}
                    pic={rider.avatarUrl}
                    bgColor={getAvatarColour()}
                  />
                  <Typography variant="caption">{rider.phoneNumber}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No riders yet</Typography>
          )}
        </Collapse>
      </DialogContentText>
    </Box>
  );
};

export { RidersContentItem };
