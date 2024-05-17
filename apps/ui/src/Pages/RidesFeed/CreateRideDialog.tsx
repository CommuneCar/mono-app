import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

import { Ride } from '@communecar/types';

import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

import { getRandomOption } from '../../utils';

const options = [tlv, apple, camera];

interface ICreateRideDialog {
  rides: Ride[];
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const CreateRideDialog = ({ rides, setOpen, isOpen }: ICreateRideDialog) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(new Date()),
  );

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const driver = 'Dar Nachmani';
            const departureTime = value!.toDate();
            console.log(departureTime);

            const startLocation = formJson.startLocation;
            const destination = formJson.destination;
            const communityName = formJson.communityName;
            const png = getRandomOption<string>(options);
            const seats = 0;
            rides.push({
              communityName,
              driver: {
                name: driver,
                id: 1,
              },
              departureTime,
              startLocationName: startLocation,
              destination,
              png,
              destinationName: destination,
              startLocation,
              seats
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create ride</DialogTitle>
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
              <DateTimePicker
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
          <FormControlLabel control={<Checkbox defaultChecked />} label="Share your costs?" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Same pronouns?" />
          {/* <Checkbox
            id="gas_money"
            name="gas_money"
            label="Share your costs?"
            type="gas_money"
            defaultChecked />
          <Checkbox {...label} defaultChecked /> */}
{/* 
          <TextField
            autoFocus
            required
            margin="dense"
            id="gas_money"
            name="gas_money"
            label="Share your costs?"
            type="gas_money"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="pronouns"
            name="pronouns"
            label="Same pronouns"
            type="pronouns"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateRideDialog;
