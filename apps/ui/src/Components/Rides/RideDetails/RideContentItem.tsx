import React from 'react';
import { DialogContentText, Typography, Box, Tooltip } from '@mui/material';

interface JoinRideProps {
  header: string;
  text: string;
  tooltipText?: string;
}

const RideContentItem: React.FC<JoinRideProps> = ({
  header,
  text,
  tooltipText,
}) => {
  return (
    <DialogContentText>
      <Box display="flex" alignItems="center">
        <Box
          display="grid"
          gridTemplateColumns="100px 1fr"
          gap={2}
          alignItems="center"
        >
          <Typography variant="subtitle1">{header}</Typography>
        </Box>
        <Tooltip title={tooltipText ?? ''}>
          <Typography variant="body1">{text}</Typography>
        </Tooltip>
      </Box>
    </DialogContentText>
  );
};

export { RideContentItem };
