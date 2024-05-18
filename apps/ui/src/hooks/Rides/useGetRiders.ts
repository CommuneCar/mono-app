import { useQuery } from 'react-query';
import { fetchRidersByRideId } from '../../apis/rides/fetch-all-rides';
import { Rider } from '@communecar/types';

export const useGetRidersByRideId = (rideId: string) => {
  return useQuery<Rider[], Error>(['ridersByRideId', rideId], () =>
    fetchRidersByRideId(rideId),
  );
};
