import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  IconButton,
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
  serachFieldvariant?: 'filled' | 'outlined' | 'standard';
  value?: string;
}

const SearchLocations: React.FC<SearchLocationsProps> = ({
  label,
  onSelect,
  serachFieldvariant = 'outlined',
  value,
}) => {
  const [inputValue, setInputValue] = useState<string>(value ?? '');
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const { showMessage } = useSnackbar();

  const searchLocations = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/api/v1/external/geocode', {
        params: { location: inputValue, limit: 3 },
      });
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
        <Tooltip title={inputValue} arrow>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label={label}
            variant={serachFieldvariant}
            sx={{
              width: '100%',
              '& .MuiInputBase-input': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={searchLocations}
                  disabled={loading}
                  sx={{ maxWidth: 16 }}
                >
                  {loading ? <CircularProgress size={20} /> : <SearchIcon />}
                </IconButton>
              ),
            }}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{ maxHeight: 300, overflow: 'auto', width: '100%', maxWidth: 500 }}
      >
        {locations.map((location, index) => (
          <Card key={index} sx={{ mb: 1 }}>
            <CardActionArea onClick={() => handleLocationSelect(location)}>
              <CardContent>
                <Tooltip title={location.displayName} arrow>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <LocationOnIcon /> {location.displayName}
                  </Typography>
                </Tooltip>
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

export { SearchLocations };
