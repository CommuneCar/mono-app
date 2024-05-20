import { useQuery } from 'react-query';
import { Rider } from '@communecar/types';
import { fetchRidersByRideId } from '../../apis/rides/fetch-riders';

export const useGetRidersByRideId = (rideId: number) => {
  return useQuery<Rider[], Error>(['ridersByRideId', rideId], () =>
    fetchRidersByRideId(rideId),
  );
};
