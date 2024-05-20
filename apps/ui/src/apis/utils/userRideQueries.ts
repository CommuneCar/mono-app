import { UserRideStatus } from '@communecar/types';

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

export { getUserRideQueries, getRidersForRide };
