import { UserRide } from '@communecar/types';

import { graphqlRequest } from '../graphql';
import { UserRidesStatus } from '../../types/ride-user-type';
import { getUserRideQueries } from '../utils/userRideQueries';

const fetchUserRides = async (userId: number): Promise<UserRidesStatus> => {
  const query = getUserRideQueries(userId);
  try {
    const response = await graphqlRequest<{
      allUserRides: { nodes: UserRide[] };
    }>(query);
    const rides = response.allUserRides.nodes;

    const ridesRecord: UserRidesStatus = {};
    rides.forEach((ride) => {
      ridesRecord[ride.rideId.toString()] = ride;
    });

    return ridesRecord;
  } catch (error) {
    console.error('Error fetching user rides:', error);
    throw error;
  }
};

export { fetchUserRides };
