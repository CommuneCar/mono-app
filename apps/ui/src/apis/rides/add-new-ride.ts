import { Ride } from '@communecar/types';
import { graphqlRequest } from '../graphql';

interface GraphQLRideResponse {
  createRide: {
    ride: Ride;
  };
}

export const addNewRide = async (ride: Ride): Promise<Ride> => {
  const query = `mutation CreateRide($input: CreateRideInput!) {
    createRide(input: $input) {
      ride {
        id
        ownerId
        fromLat
        fromLong
        toLat
        toLong
        startTime
        seats
      }
    }
  }`;

  const variables = {
    input: {
      ride: {
        ownerId: ride.driver.id,
        fromLat: ride.startLocation[0],
        fromLong: ride.startLocation[1],
        toLat: ride.destination[0],
        toLong: ride.destination[1],
        gasMoney: ride.gasMoney ?? 0,
        pronouns: ride.pronouns ?? false,
        startTime: ride.departureTime.toISOString(),
        seats: ride.seats,
        modificationTs: new Date().toISOString()
      }
    }
  };

  const responseData = await graphqlRequest<GraphQLRideResponse>(query, variables);
  return responseData.createRide.ride;
};