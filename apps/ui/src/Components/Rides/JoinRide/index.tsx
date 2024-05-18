import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Grid,
} from '@mui/material';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { TEXT } from '../../../themes/default/consts';

interface JoinRideProps {
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const JoinRideDialog: React.FC<JoinRideProps> = ({ isOpen, setOpen }) => {
  const { showMessage } = useSnackbar();

  const [isChecked, setChecked] = useState(false);
  const [numberOfRiders, setNumberOfRiders] = useState(1);
  const [location, setLocation] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(5, Number(event.target.value)));
    setNumberOfRiders(value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const onCancel = () => {
    setChecked(false);
    setNumberOfRiders(1);
    setLocation('');
    setOpen(false);
  };

  const onSubmitForm = () => {
    //TODO - submit
    setOpen(false);
    showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
  };

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
              value={numberOfRiders}
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
};

export { JoinRideDialog };
