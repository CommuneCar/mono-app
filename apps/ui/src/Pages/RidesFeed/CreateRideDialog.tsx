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
  Typography,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
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
import { addNewRide } from '../../apis/rides/add-new-ride';

const options = [tlv, apple, camera];

export interface CreateRideDialogProps {
  rides: Ride[];
  communities: Community[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

const CreateRideDialog = ({ rides, communities, setOpen, isOpen }: CreateRideDialogProps) => {
  const [departureTime, setDepartureTime] = useState(dayjs());
  const [community, setCommunity] = useState<Community | null>(null);
  const [gasMoney, setGasMoney] = useState('');
  const [pronounsOnly, setPronounsOnly] = useState(false);
  const [seats, setSeats] = useState('');
  const [startLocation, setStartLocation] = useState<LocationResult | null>(null);
  const [destination, setDestination] = useState<LocationResult | null>(null);

  const handleLocationSelect = (location: LocationResult, type: string) => {
    if (type === 'start') {
      setStartLocation(location);
    } else {
      setDestination(location);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!community || !startLocation || !destination || !gasMoney || !seats) {
      alert('All fields are required.');
      return;
    }

    const png = getRandomOption(options);
    const newRide: Ride = {
      communityName: community.name,
      driver: { name: 'Dar Nachmani', id: 5 },  // TODO: Replace with user from session
      departureTime: departureTime.toDate(),
      startLocationName: startLocation.displayName,
      destinationName: destination.displayName,
      startLocation: [parseFloat(startLocation.lat), parseFloat(startLocation.lon)],
      destination: [parseFloat(destination.lat), parseFloat(destination.lon)],
      png,
      gasMoney: parseFloat(gasMoney),
      pronouns: pronounsOnly,
      seats: parseInt(seats, 10),
      pickups: []
    };

    try {
      await addNewRide(newRide);
      handleClose();
    } catch (error) {
      console.error('Error creating new ride:', error);
    }
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
        <SearchCommunities communities={communities} selectedCommunity={community} setSelectedCommunity={setCommunity} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Departure Time"
            value={departureTime}
            onChange={setDepartureTime}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <Typography variant="h6" sx={{ mt: 2 }}>Start Location:</Typography>
        <SearchLocations onSelect={(location) => handleLocationSelect(location, 'start')} />
        <Typography variant="h6" sx={{ mt: 2 }}>Destination:</Typography>
        <SearchLocations onSelect={(location) => handleLocationSelect(location, 'destination')} />
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
          control={<Switch checked={pronounsOnly} onChange={(e) => setPronounsOnly(e.target.checked)} />}
          label="Pronouns Only"
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
