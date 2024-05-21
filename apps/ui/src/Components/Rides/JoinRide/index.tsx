import React, { useState } from 'react';
import {
  Grid,
  Dialog,
  Button,
  Checkbox,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

import { LocationResult, Ride } from '@communecar/types';

import { TEXT } from '../../../themes/default/consts';
import { useUser } from '../../../hooks/Users/useUser';
import SearchLocations from '../../../Pages/Search/Locations';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { DEFAULT_USER_ID } from '../../../apis/utils/defaultConst';
import { usePostRequestUserRide } from '../../../hooks/Rides/usePostRequestUserRide';

interface JoinRideProps {
  rideToJoin: Ride;
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const JoinRideDialog: React.FC<JoinRideProps> = ({
  isOpen,
  setOpen,
  rideToJoin,
}) => {
  const { showMessage } = useSnackbar();

  const { user } = useUser();
  const { mutateAsync, isLoading: isJoiningRide } = usePostRequestUserRide();

  const [isChecked, setChecked] = useState(false);
  const [numberOfRiders, setNumberOfRiders] = useState(1);
  const [_, setLocation] = useState<LocationResult>({} as LocationResult);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(5, Number(event.target.value)));
    setNumberOfRiders(value);
  };

  const onCancel = () => {
    setChecked(false);
    setNumberOfRiders(1);
    setLocation({} as LocationResult);
    setOpen(false);
  };

  const onSubmitForm = () => {
    mutateAsync({
      userId: user?.id ?? DEFAULT_USER_ID,
      rideId: rideToJoin.id,
      status: 'Pending',
    }).then(() => {
      setOpen(false);
      showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
    });
  };

  return (
    <Dialog open={isOpen} onClose={() => setOpen(false)}>
      <DialogTitle>Join Ride</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SearchLocations
              label={'Pickup location'}
              onSelect={(location: LocationResult): void => {
                setLocation(location);
              }}
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
              type="number"
              margin="normal"
              value={numberOfRiders}
              label="Number of passengers"
              onChange={handleNumberChange}
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        {isJoiningRide ? (
          <CircularProgress />
        ) : (
          <Button
            onClick={() => {
              onSubmitForm();
            }}
          >
            Join
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export { JoinRideDialog };
