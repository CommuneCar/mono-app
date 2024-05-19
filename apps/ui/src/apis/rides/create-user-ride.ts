import { graphqlRequest } from '../graphql';
import { UserRide } from '@communecar/types';

const CREATE_USER_RIDE_MUTATION = `
  mutation CreateUserRide($input: CreateUserRideInput!) {
    createUserRide(input: $input) {
      userRide {
        userId
        rideId
        status
        fromLat
        fromLong
        toLat
        toLong
      }
    }
  }
`;

interface CreateUserRideResponse {
  createUserRide: {
    userRide: UserRide;
  };
}

export const createUserRide = async (
  userId: number,
  rideId: number,
  fromLat: number,
  fromLong: number,
  toLat: number,
  toLong: number,
  status: string,
): Promise<UserRide> => {
  const variables = {
    input: {
      userRide: { userId, rideId, fromLat, fromLong, toLat, toLong, status },
    },
  };

  try {
    const data = await graphqlRequest<CreateUserRideResponse>(
      CREATE_USER_RIDE_MUTATION,
      variables,
    );
    return data.createUserRide.userRide;
  } catch (error) {
    console.error('Error creating user ride:', error);
    throw error;
  }
};
