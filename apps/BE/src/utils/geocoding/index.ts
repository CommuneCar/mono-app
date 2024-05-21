import axios from 'axios';
require('dotenv').config();  // Load environment variables

// Axios instances for different geocoding services
const clientNominatim = axios.create({ baseURL: 'https://nominatim.openstreetmap.org', params: { format: 'json', limit: 1 } });
const clientMapsCo = axios.create({ baseURL: 'https://geocode.maps.co' });
const clientLocationIQ = axios.create({ baseURL: 'https://us1.locationiq.com/v1', params: { format: 'json' } });

// Utility to perform parallel geocoding requests with fallback
async function geocodeWithFallback(location: string): Promise<any> {
  const queries = [
    clientNominatim.get(`/search`, { params: { q: location } }).then(response => {
        console.log("nominatim")
        return response.data
    }),
    clientMapsCo.get(`/search`, { params: { q: location, api_key: process.env.GEOCODE_MAPS_CO_KEY || 'your_maps_co_api_key' } }).then(response => response.data),
    clientLocationIQ.get(`/search`, { params: { q: location, key: process.env.LOCATIONIQ_KEY || 'your_locationiq_api_key' } }).then(response => response.data)
  ];

  try {
    // Using the first response we get back from an API:
    const results = await Promise.any(queries);
    return results.map((item: any) => ({
      name: item.name,
      displayName: item.display_name || item.label,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error('Failed to resolve geocode:', error);
    throw new Error('Geocoding failed');
  }
}

async function reverseGeocodeWithFallback(latitude: string, longitude: string): Promise<any> {
  const queries = [
    clientNominatim.get(`/reverse`, { params: { lat: latitude, lon: longitude } }).then(response => response.data),
    clientMapsCo.get(`/reverse`, { params: { lat: latitude, lon: longitude, api_key: process.env.GEOCODE_MAPS_CO_KEY || 'your_maps_co_api_key' } }).then(response => response.data),
    clientLocationIQ.get(`/reverse`, { params: { lat: latitude, lon: longitude, key: process.env.LOCATIONIQ_KEY || 'your_locationiq_api_key' } }).then(response => response.data)
  ];

  try {
    // Using the first response we get back from an API:
    const result = await Promise.any(queries);
    return {
      name: result.name,
      displayName: result.display_name || result.label,
      lat: result.lat,
      lon: result.lon,
    };
  } catch (error) {
    console.error('Failed to reverse resolve geocode:', error);
    throw new Error('Reverse geocoding failed');
  }
}


export { geocodeWithFallback, reverseGeocodeWithFallback };