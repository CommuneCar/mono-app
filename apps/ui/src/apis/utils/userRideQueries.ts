import { UserRideStatus } from '@communecar/types';
import { EditRideSchema } from '@communetypes/EditRideSchema';

const getUserRideQueries = (userId: number) => {
  return `
query {
  allUserRides(condition: { userId: ${userId} }) {
    nodes {
      fromLat
      fromLong
      rideId
      status
      toLat
      toLong
      userId
    }
  }
}
`;
};

const getRidersForRide = (rideId: number) => {
  return `{
  allRides(condition: {id: ${rideId}}) {
    nodes {
      ownerId
      id
      userRidesByRideId(condition: {status: "${UserRideStatus.CONFIRMED}"}) {
        nodes {
          userId
          status
          userByUserId {
            phoneNumber
            profileImage
            lastName
            firstName
            gender
            email
            age
            id
          }
        }
      }
    }
  }
}`;
};

const updateRideQuery = (ride: EditRideSchema) => {
  return `
  mutation {
  updateRideById(
    input: {ridePatch: {gasMoney: ${ride.gasMoney}, communityId: ${ride.communityId}, 
      seats: ${ride.seats}, startTime: "${ride.departureTime.toISOString()}", 
      fromLat: ${ride.startLocation[0]}, fromLong: ${ride.startLocation[1]}, 
      toLat: ${ride.destination[0]},
        toLong: ${ride.destination[1]}, modificationTs: "${new Date().toISOString()}",
        fromName: "${ride.startLocationName}",
        toName: "${ride.destinationName}", pronouns: ${ride.pronouns}}, id: ${ride.id}}
  ) {
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
}
  `;
};

export { getUserRideQueries, getRidersForRide, updateRideQuery };
