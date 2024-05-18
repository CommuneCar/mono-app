import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import { axiosClient } from '../../../apis/client';
import { LocationResult } from '@communetypes/Geocoding';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { TEXT } from '../../../themes/default/consts';

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

interface SearchLocationsProps {
  label: string;
  onSelect: (location: LocationResult) => void;
}

const SearchLocations: React.FC<SearchLocationsProps> = ({ label, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const { showMessage } = useSnackbar();

  const searchLocations = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/api/v1/external/geocode', { params: { location: inputValue, limit: 3 } });
      const data: LocationResult[] = await response.data;
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: LocationResult) => {
    setInputValue(location.displayName);
    setLocations([]);
    onSelect(location);
  };

  return (
    <CenteredBox>
      <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label={label}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <Button
                onClick={searchLocations}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                style={{ maxWidth: 16 }}
                variant="outlined"
              />
            ),
          }}
        />
      </Box>
      <Box
        sx={{ maxHeight: 300, overflow: 'auto', width: '100%', maxWidth: 500 }}
      >
        {locations.map((location, index) => (
          <Card key={index} sx={{ mb: 1 }}>
            <CardActionArea onClick={() => handleLocationSelect(location)}>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <LocationOnIcon /> {location.displayName}
                </Typography>
                <Typography variant="body2">
                  Lat: {location.lat}, Lon: {location.lon}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </CenteredBox>
  );
};

export default SearchLocations;
