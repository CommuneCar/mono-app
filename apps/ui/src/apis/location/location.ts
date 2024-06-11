import { LocationResult, Location } from '@communecar/types';
import axios from 'axios';

import { axiosClient } from '../client';
import { isArray, isNil, isUndefined } from 'lodash';

const UNKNOWN_LOCATION = 'Unknown location 😵‍💫';

const geocode = async (coords: {
  lat: number;
  lon: number;
}): Promise<string> => {
  try {
    const response = await axiosClient.get<LocationResult[]>(
      '/api/v1/external/reverse-geocode',
      {
        params: { lat: coords.lat, lon: coords.lon },
      },
    );

    if (response.data) {
      let { data } = response;
      if (!isArray(data)) {
        data = [data] as LocationResult[];
      }
      if (data.length > 0 && !isUndefined(data[0])) {
        return data[0].displayName || data[0].name;
      } else {
        console.error('Geocoding error');
        return UNKNOWN_LOCATION;
      }
    }
    throw new Error('data missing');
  } catch (error) {
    console.error('Geocoding error:', error);
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      console.log(error);
      return UNKNOWN_LOCATION;
    }
    console.log(error);
    return 'An extremely unknown location 😵‍💫😵‍💫';
  }
};

const locationExtraction = async (node: {
  long?: number;
  lat?: number;
  baseLocationName?: string;
}): Promise<Location | undefined> => {
  if (isNil(node.lat) || isNil(node.long)) {
    return;
  }
  const name =
    node.baseLocationName ??
    (await geocode({
      lat: node.lat,
      lon: node.long,
    })) ??
    undefined;

  const coordinates: Location | undefined =
    {
      lat: node.lat,
      lon: node.long,
      name,
    };
  return coordinates;
};

export { geocode, locationExtraction };
