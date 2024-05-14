import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
} from '@mui/material';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';

import { Ride } from '@communecar/types';

import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

import { getRandomOption } from '../../utils';
import { useUser } from '../../hooks/Users/useUser';

const options = [tlv, apple, camera];

interface ICreateRideDialog {
  rides: Ride[];
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const CreateRideDialog = ({ rides, setOpen, isOpen }: ICreateRideDialog) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(new Date()));

  const { user } = useUser();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const driver = `${user?.firstName} ${user?.lastName}`;
          const departureTime = value!.toDate();

          const startLocation = formJson.startLocation;
          const destination = formJson.destination;
          const communityName = formJson.communityName;
          const png = getRandomOption(options);
          rides.push({
            communityName,
            driver: {
              name: driver,
              id: user!.id,
            },
            departureTime,
            startLocationName: startLocation,
            destination,
            png,
            destinationName: destination,
            startLocation,
          });
          handleClose();
        },
      }}
    >
      <DialogTitle>Create ride</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          To add a ride, please fill all details here. We will post your ride
          right after.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="communityName"
          name="communityName"
          label="Community Name"
          type="communityName"
          fullWidth
          variant="standard"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <MobileDateTimePicker
              label="Departure time"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          autoFocus
          required
          margin="dense"
          id="startLocation"
          name="startLocation"
          label="Start Location"
          type="startLocation"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="destination"
          name="destination"
          label="Destination"
          type="destination"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRideDialog;
