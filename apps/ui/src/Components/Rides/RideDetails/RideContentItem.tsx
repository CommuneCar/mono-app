import React from 'react';
import { DialogContentText, Typography, Box } from '@mui/material';

interface JoinRideProps {
  header: string;
  text: string;
}

const RideContentItem: React.FC<JoinRideProps> = ({ header, text }) => {
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
        <Typography variant="body1">{text}</Typography>
      </Box>
    </DialogContentText>
  );
};

export { RideContentItem };
