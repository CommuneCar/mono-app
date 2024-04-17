import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { RidesCardProps } from './RideCard';
import tlv from '../assets/tlv.png';
import apple from '../assets/apple.png';
import camera from '../assets/camera.png';
import { getRandomOption } from '../utils';

const options = [tlv, apple, camera];

interface ICreateRideDialog {
  rides: RidesCardProps[];
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
    dayjs('2022-04-17T15:30'),
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
            const png = getRandomOption(options);
            rides.push({
              communityName,
              driver,
              departureTime,
              startLocation,
              destination,
              png,
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
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="departureTime"
            name="departureTime"
            label="Departure Time"
            type="date"
            fullWidth
            variant="standard"
          /> */}
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
