import { graphqlRequest } from '../graphql';
import { DEFAULT_LAT_LONG } from '../utils/defaultConst';

interface PostRequestToJoinRideResponse {
  createUserRide: {
    userRide: {
      userId: number;
      rideId: number;
      status: string;
      fromLat: number;
      fromLong: number;
    };
  };
}
const getUpdateQuery = (
  userId: number,
  rideId: number,
  status: string,
  toLat?: number,
  toLong?: number,
  fromLat?: number,
  fromLong?: number,
): string => {
  return `mutation {
  createUserRide(
    input: {
      userRide: {
        userId: ${userId}
        rideId: ${rideId}
        status: "${status}"
        toLat: ${toLat ?? DEFAULT_LAT_LONG}
        toLong: ${toLong ?? DEFAULT_LAT_LONG}
        fromLat: ${fromLat ?? DEFAULT_LAT_LONG}
        fromLong: ${fromLong ?? DEFAULT_LAT_LONG}
      }
    }
  ) {
    userRide {
      fromLat
      fromLong
      rideId
      status
      userId
    }
  }
}`;
};

const postRequestToJoinRide = async (
  userId: number,
  rideId: number,
  status: string,
): Promise<{ userId: number; rideId: number; status: string }> => {
  const query = getUpdateQuery(userId, rideId, status);
  try {
    const response = await graphqlRequest<PostRequestToJoinRideResponse>(query);
    return response.createUserRide.userRide;
  } catch (error) {
    console.error('Error updating user ride status:', error);
    throw error;
  }
};

export { postRequestToJoinRide };
