import React, { useState } from 'react';
import {
  DialogContentText,
  Box,
  IconButton,
  Collapse,
  Typography,
  Badge,
  Avatar,
  styled,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Rider } from '@communetypes/Rider';
import { COLORS, SPACING } from '../../../themes/default/consts';
import { useEditRider } from '../../../hooks/Rides/useEditRiders';
import { UserRideStatus } from '@communecar/types';

interface DriverContentItemProps {
  riders: Rider[] | undefined;
  rideId: number;
  setRideRiders: (riders: Rider[]) => void;
}

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const RidersContentItemEditMode: React.FC<DriverContentItemProps> = ({
  riders,
  rideId,
  setRideRiders,
}) => {
  const [showRiders, setShowRiders] = useState(false);

  const { mutateAsync: editRider } = useEditRider(
    rideId,
    UserRideStatus.REJECTED,
  );

  const toggleRidersList = () => {
    setShowRiders(!showRiders);
  };
  const onRemoveRider = async (rider: Rider) => {
    await editRider(rider.id);
    setRideRiders(riders!.filter((r: Rider) => r.id !== rider.id));
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
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar>
                        <IconButton onClick={() => onRemoveRider(rider)}>
                          <CloseIcon />
                        </IconButton>
                      </SmallAvatar>
                    }
                  >
                    <Avatar
                      sx={{
                        width: SPACING.SP16,
                        height: SPACING.SP16,
                        color: COLORS.TEXT_PRIMARY,
                      }}
                      src={rider.avatarUrl}
                    />
                  </Badge>
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

export { RidersContentItemEditMode };
