import { Ride, UserRideStatus, EditRideSchema } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import {
  deleteRiderQuery,
  updateRideQuery,
  updateRidersQuery,
} from '../utils/userRideQueries';
interface GraphQLRideResponse {
  updateRideById: {
    ride: Ride;
  };
}

interface GraphQLRiderResponse {
  updateUserRideByUserIdAndRideId: {
    userRide: {
      rideId: number;
      status: string;
    };
  };
}

const postUpdateRide = async (ride: EditRideSchema): Promise<Ride> => {
  const query = updateRideQuery(ride);

  try {
    const responseData = await graphqlRequest<GraphQLRideResponse>(query);
    return responseData.updateRideById.ride;
  } catch (error) {
    console.error('Error updating ride:', error);
    throw error;
  }
};

const cancelRideByRider = async (
  riderId: number,
  rideId: number,
  status: UserRideStatus,
): Promise<{
  rideId: number;
  status: string;
}> => {
  const query = updateRidersQuery(riderId, rideId, status);

  try {
    const responseData = await graphqlRequest<GraphQLRiderResponse>(query);
    return responseData.updateUserRideByUserIdAndRideId.userRide;
  } catch (error) {
    console.error('Error updating rider:', error);
    throw error;
  }
};

const deleteRider = async (
  riderId: number,
  rideId: number,
): Promise<{
  rideId: number;
  status: string;
}> => {
  const query = deleteRiderQuery(riderId, rideId);

  try {
    const responseData = await graphqlRequest<GraphQLRiderResponse>(query);
    return responseData.updateUserRideByUserIdAndRideId.userRide;
  } catch (error) {
    console.error('Error deleting rider:', error);
    throw error;
  }
};

export { postUpdateRide, cancelRideByRider, deleteRider };
