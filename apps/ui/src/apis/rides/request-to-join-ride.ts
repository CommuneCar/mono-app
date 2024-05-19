import { graphqlRequest } from '../graphql';

interface UpdateUserRideResponse {
  updateUserRideByUserIdAndRideId: {
    userRide: {
      userId: number;
      rideId: number;
      status: string;
    };
  };
}

const getUpdateQuery = (
  userId: number,
  rideId: number,
  status: string,
): string => {
  return `mutation{
        updateUserRideByUserIdAndRideId(input: {
            userId: ${userId},
            rideId: ${rideId},
            userRidePatch: {
              status: "${status}"
            }
          }) {
            userRide {
              userId
              rideId
              status
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
    const response = await graphqlRequest<UpdateUserRideResponse>(query);
    return response.updateUserRideByUserIdAndRideId.userRide;
  } catch (error) {
    console.error('Error updating user ride status:', error);
    throw error;
  }
};

export { postRequestToJoinRide };
