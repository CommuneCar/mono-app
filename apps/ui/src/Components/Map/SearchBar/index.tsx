import React, { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, Card, CardActionArea, CardContent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

type Location = {
  display_name: string;
  lat: string;
  lon: string;
};

const LocationSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const searchLocations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(inputValue)}&format=json&limit=5`);
      const data: Location[] = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    console.log('Selected location:', location.display_name, location.lat, location.lon);
    setInputValue(location.display_name);
    setLocations([]);
  };

  return (
    <CenteredBox>
      <Box mb={2} sx={{ width: '100%', maxWidth: '750px' }}>
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label="Search for a location"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <Button
                onClick={searchLocations}
                disabled={loading}
                startIcon={loading ? <CircularProgress /> : <SearchIcon />}
              >
              </Button>
            ),
          }}
        />
      </Box>
      <Box sx={{ maxHeight: 300, overflow: 'auto', width: '100%', maxWidth: 500 }}>
        {locations.map((location, index) => (
          <Card key={index} sx={{ mb: 1 }}>
            <CardActionArea onClick={() => handleLocationSelect(location)}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon /> {location.display_name}
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

export default LocationSearch;
