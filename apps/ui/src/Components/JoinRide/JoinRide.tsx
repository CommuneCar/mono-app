import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';

interface IJoinRideDialog {
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

function JoinRideDialog({ isOpen, setOpen }: IJoinRideDialog) {
  const [isChecked, setChecked] = useState(false);
  const [number, setNumber] = useState(1);
  const [location, setLocation] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(5, Number(event.target.value)));
    setNumber(value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onCancel = () => {
    setChecked(false);
    setNumber(1);
    setLocation('');
    setOpen(false);
  };

  const onSubmitForm = () => {};

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)}>
      <DialogTitle>Join Ride</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Pickup Location"
              type="text"
              value={location}
              onChange={handleLocationChange}
              margin="normal"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              }
              label="Open to Alternate Pickup Points"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of passengers"
              type="number"
              value={number}
              onChange={handleNumberChange}
              inputProps={{ min: 1, max: 5 }}
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => {
            onSubmitForm();
          }}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default JoinRideDialog;
