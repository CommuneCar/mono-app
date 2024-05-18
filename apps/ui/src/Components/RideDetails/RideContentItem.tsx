import React from 'react';
import { DialogContentText, Typography, Box } from '@mui/material';

interface JoinRideProps {
  header: string;
  text: string;
}

const RideContentItem: React.FC<JoinRideProps> = ({ header, text }) => {
  return (
    <DialogContentText display="flex" alignItems="center">
      <Box component="span" sx={{ mr: 1 }}>
        <Typography variant="subtitle1">{header}</Typography>
      </Box>
      {text}
    </DialogContentText>
  );
};

export { RideContentItem };
