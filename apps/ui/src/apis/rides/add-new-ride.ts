import { Ride } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { CreateRideSchema } from '@communetypes/CreateRideSchema';

interface GraphQLRideResponse {
  createRide: {
    ride: Ride;
  };
}

export const addNewRide = async (ride: CreateRideSchema): Promise<Ride> => {
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
        communityId
        fromName
        toName
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
        modificationTs: new Date().toISOString(),
        communityId: ride.communityId,
        fromName: ride.startLocationName ?? null,
        toName: ride.destinationName ?? null,
      },
    },
  };

  const responseData = await graphqlRequest<GraphQLRideResponse>(
    query,
    variables,
  );
  return responseData.createRide.ride;
};
