import { useQuery } from 'react-query';
import { UserRidesStatus } from '../../types/ride-user-type';
import { fetchUserRides } from '../../apis/rides/fetch-user-ride-connections';

const useUserRides = (userId: number) => {
  return useQuery<UserRidesStatus, Error>(['userRides', userId], () =>
    fetchUserRides(userId),
  );
};

export { useUserRides };
