import { Dispatch, SetStateAction, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';
import { LocationResult } from '@communetypes/Geocoding';
import SearchLocations from '../Search/Locations';
import { Ride } from '@communetypes/Ride';
import { Community } from '@communetypes/Community';
import SearchCommunities from '../Search/Communities';
import { useAddNewRide } from '../../hooks/Rides/useAddNewRide';

const options = [tlv, apple, camera];

export interface CreateRideDialogProps {
  communities: Community[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const CreateRideDialog = ({
  communities,
  setOpen,
  isOpen,
}: CreateRideDialogProps) => {
  const { mutate: addRide } = useAddNewRide();
  const [departureTime, setDepartureTime] = useState<dayjs.Dayjs | null>(
    dayjs(),
  );
  const [community, setCommunity] = useState<Community | null>(null);
  const [gasMoney, setGasMoney] = useState('0');
  const [pronounsOnly, setPronounsOnly] = useState(false);
  const [seats, setSeats] = useState('0');
  const [startLocation, setStartLocation] = useState<LocationResult | null>(
    null,
  );
  const [destination, setDestination] = useState<LocationResult | null>(null);

  const handleLocationSelect = (location: LocationResult, type: string) => {
    if (type === 'start') {
      setStartLocation(location);
    } else {
      setDestination(location);
    }
  };

  const handleSubmit = async () => {
    if (!community || !startLocation || !destination || !gasMoney || !seats) {
      alert('All fields are required.');
      return;
    }

    const png = getRandomOption(options);
    const newRide: Ride = {
      id: 1,
      communityName: community.title,
      driver: { name: 'Dar Nachmani', id: 5, phoneNumber: '123456' }, // TODO: Replace with user from session
      departureTime: departureTime!.toDate(),
      startLocationName: startLocation.displayName,
      destinationName: destination.displayName,
      startLocation: [
        parseFloat(startLocation.lat),
        parseFloat(startLocation.lon),
      ],
      destination: [parseFloat(destination.lat), parseFloat(destination.lon)],
      png,
      gasMoney: parseFloat(gasMoney),
      pronouns: pronounsOnly,
      seats: parseInt(seats, 10),
      pickups: [],
    };

    addRide(newRide, {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error('Error creating new ride:', error); // TODO: Throw an alert or smth
      },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Create Ride</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to add a new ride.
        </DialogContentText>
        <SearchCommunities
          communities={communities}
          selectedCommunity={community}
          setSelectedCommunity={setCommunity}
        />
        <Box my={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDateTimePicker
              label="Departure Time"
              value={departureTime}
              onChange={(newValue) => setDepartureTime(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Box>
        <SearchLocations
          label="Start location"
          onSelect={(location) => handleLocationSelect(location, 'start')}
        />
        <SearchLocations
          label="Destination"
          onSelect={(location) => handleLocationSelect(location, 'destination')}
        />
        <TextField
          margin="dense"
          id="gasMoney"
          label="Gas Money"
          type="number"
          fullWidth
          value={gasMoney}
          onChange={(e) => setGasMoney(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={pronounsOnly}
              onChange={(e) => setPronounsOnly(e.target.checked)}
            />
          }
          label="Same pronouns only"
        />
        <TextField
          margin="dense"
          id="seats"
          label="Seats"
          type="number"
          fullWidth
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRideDialog;
