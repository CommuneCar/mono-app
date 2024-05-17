import React, { useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Box,
  IconButton,
  Autocomplete,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';

import { axiosClient } from '../../apis/client';
import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';

const options = [tlv, apple, camera];

const CreateRideDialog = ({ rides, setOpen, isOpen }) => {
  const [departureTime, setDepartureTime] = useState(dayjs());
  const [communityName, setCommunityName] = useState('');
  const [gasMoney, setGasMoney] = useState('');
  const [pronounsOnly, setPronounsOnly] = useState(false);
  const [seats, setSeats] = useState('');
  const startLocationRef = useRef();
  const destinationRef = useRef();

  const handleSearchLocation = async (query) => {
    try {
      const response = await axiosClient.get('/api/v1/external/geocode', { params: { location: query } });
      return response.data.map(location => ({
        label: location.displayName || location.name,
        lat: location.lat,
        lon: location.lon
      }));
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const png = getRandomOption(options);
    const startLocation = startLocationRef.current?.value;
    const destination = destinationRef.current?.value;

    const newRide = {
      communityName,
      driver: { name: 'Dar Nachmani', id: 5 },
      departureTime: departureTime.toDate(),
      startLocationName: startLocation,
      destinationName: destination,
      startLocation: [], // Replace with actual coordinates from Autocomplete
      destination: [], // Replace with actual coordinates from Autocomplete
      png,
      gasMoney: parseFloat(gasMoney),
      pronouns: pronounsOnly,
      seats: parseInt(seats, 10)
    };
    rides.push(newRide);
    handleClose();
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Create Ride</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill in the details to add a new ride.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="communityName"
          label="Community Name"
          type="text"
          fullWidth
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Departure Time"
            value={departureTime}
            onChange={setDepartureTime}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <SearchBar options={[]} handleChangeSearchValue={handleSearchLocation} ref={startLocationRef} placeholder="Start Location" />
        <SearchBar options={[]} handleChangeSearchValue={handleSearchLocation} ref={destinationRef} placeholder="Destination" />
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

const SearchBar = React.forwardRef(({ options, handleChangeSearchValue, placeholder }, ref) => {
  const handleChange = (_event, value) => {
    handleChangeSearchValue(value);
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Autocomplete
        freeSolo
        options={options}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            ref={ref}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <IconButton onClick={() => handleChangeSearchValue(ref.current?.value)}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        )}
      />
    </Box>
  );
});

export default CreateRideDialog;
