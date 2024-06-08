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

import SearchLocations from '../../../Pages/Search/Locations';
import { Community, LocationResult, Ride, Rider } from '@communecar/types';
import SearchCommunities from '../../../Pages/Search/Communities';
import { useUser } from '../../../hooks/Users/useUser';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { TEXT } from '../../../themes/default/consts';
import { SubmitButton } from '../../../Components/styles/SubmitButton.styled';
import { useEditNewRide } from '../../../hooks/Rides/useEditRide';
import { EditRideSchema } from '@communetypes/EditRideSchema';
import { RidersContentItemEditMode } from './EditRidersAvater';
import { useGetRidersByRideId } from '../../../hooks/Rides/useGetRiders';

export interface CreateRideDialogProps {
  communities: Community[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  ride: Ride;
}

const EditRideDialog = ({
  communities,
  setOpen,
  isOpen,
  ride,
}: CreateRideDialogProps) => {
  const { data: riders } = useGetRidersByRideId(ride.id);
  const { mutateAsync: editRide, isSuccess, isLoading } = useEditNewRide();
  const { user } = useUser();
  const [departureTime, setDepartureTime] = useState<dayjs.Dayjs | null>(
    dayjs(),
  );

  const [community, setCommunity] = useState<Community | null>(
    communities?.find((community) => community?.title === ride.communityName)!,
  );

  const [gasMoney, setGasMoney] = useState(ride.gasMoney.toString());
  const [pronounsOnly, setPronounsOnly] = useState(ride.pronouns);
  const [seats, setSeats] = useState(ride.seats.toString());
  const [startLocation, setStartLocation] = useState<LocationResult | null>({
    name: ride.startLocationName,
    lat: ride.startLocation[0].toString(),
    lon: ride.startLocation[1].toString(),
    displayName: ride.startLocationName,
  });
  const [destination, setDestination] = useState<LocationResult | null>({
    name: ride.destinationName,
    lat: ride.destination[0].toString(),
    lon: ride.destination[1].toString(),
    displayName: ride.destinationName,
  });

  const [rideRiders, setRideRiders] = useState<Rider[]>(riders ?? []);

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

    const updatedRide: EditRideSchema = {
      communityName: community.title,
      communityId: community.id,
      driver: user,
      departureTime: departureTime!.toDate(),
      startLocationName: startLocation.displayName,
      destinationName: destination.displayName,
      startLocation: [
        parseFloat(startLocation.lat),
        parseFloat(startLocation.lon),
      ],
      destination: [parseFloat(destination.lat), parseFloat(destination.lon)],
      gasMoney: parseFloat(gasMoney),
      pronouns: pronounsOnly,
      seats: parseInt(seats, 10),
      pickups: [],
      id: ride.id,
      png: ride.png,
    };

    await editRide(updatedRide);
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
      <DialogTitle>Edit Ride</DialogTitle>
      <DialogContent>
        <DialogContentText>Update the details you want ride.</DialogContentText>
        <SearchCommunities
          communities={communities}
          selectedCommunity={community}
          setSelectedCommunity={setCommunity}
        />
        <Box my={2}>
          <MobileDateTimePicker
            label="Departure Time"
            value={dayjs(ride.departureTime)}
            onChange={(newValue) => setDepartureTime(newValue)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Box>
        <SearchLocations
          label="Start location"
          value={ride.startLocationName}
          onSelect={(location: LocationResult) =>
            handleLocationSelect(location, 'start')
          }
        />
        <SearchLocations
          value={ride.destinationName}
          label="Destination"
          onSelect={(location: LocationResult) =>
            handleLocationSelect(location, 'destination')
          }
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
        <RidersContentItemEditMode
          riders={rideRiders}
          setRideRiders={setRideRiders}
          rideId={ride.id}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          {TEXT.CLOSE}
        </Button>
        <SubmitButton type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? (
            <CircularProgress size={24} color="info" />
          ) : (
            TEXT.UPDATE
          )}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export { EditRideDialog };
