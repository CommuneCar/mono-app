import { fetchAllRides } from '../../apis/rides/fetch-all-rides';

const useGetAllRides = () => {
  return fetchAllRides();
};

export { useGetAllRides };
