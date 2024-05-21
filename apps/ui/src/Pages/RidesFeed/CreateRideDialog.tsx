import { Dispatch, SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  Switch,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogContentText,
  CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';

import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';
import SearchLocations from '../Search/Locations';
import { Community, Ride, LocationResult } from '@communecar/types';
import SearchCommunities from '../Search/Communities';
import { useAddNewRide } from '../../hooks/Rides/useAddNewRide';
import { useUser } from '../../hooks/Users/useUser';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { TEXT } from '../../themes/default/consts';
import { SubmitButton } from '../../Components/styles/SubmitButton.styled';

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
  const { mutateAsync: addRide, isSuccess, isLoading } = useAddNewRide();
  const { user } = useUser();
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!community || !startLocation || !destination || !gasMoney || !seats) {
      alert('All fields are required.');
      return;
    }
    if (!user) {
      alert('Login is required for this operation');
      return;
    }

    const png = getRandomOption(options);
    const newRide: Omit<Ride, 'id'> = {
      communityName: community.title,
      driver: {
        name: `${user.firstName} ${user.lastName}`,
        id: user.id,
        phoneNumber: user.phone,
      },
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

    await addRide(newRide);
    if (isSuccess) {
      handleClose();
    }
  };

  if (isSuccess) {
    handleClose();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        style: {
          height: '75vh',
          maxHeight: '75vh',
        },
      }}
    >
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
          <MobileDateTimePicker
            label="Departure Time"
            value={departureTime}
            onChange={(newValue) => setDepartureTime(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
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
        <Button onClick={handleClose} disabled={isLoading}>
          {TEXT.CANCEL}
        </Button>
        <SubmitButton type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? (
            <CircularProgress size={24} color="info" />
          ) : (
            TEXT.CREATE
          )}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { CreateRideDialog };
