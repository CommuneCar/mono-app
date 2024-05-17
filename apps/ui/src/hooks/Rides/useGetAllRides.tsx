import { useQuery } from 'react-query';
import { fetchAllRides } from '../../apis/rides/fetch-all-rides';
import { Ride } from '@communecar/types';

export const useGetAllRides = () => {
  return useQuery<Ride[], Error>('rides', fetchAllRides);
};