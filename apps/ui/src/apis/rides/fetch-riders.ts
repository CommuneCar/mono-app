import { UserRideStatus, Rider, Gender } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getRidersForRide } from '../utils/userRideQueries';

interface User {
  id: number;
  phoneNumber: string;
  profileImage: string;
  lastName: string;
  firstName: string;
  gender: string;
  email: string;
  age: number;
}

interface UserRide {
  userId: number;
  status: UserRideStatus;
  userByUserId: User;
}

interface RideNode {
  ownerId: number;
  userRidesByRideId: {
    nodes: UserRide[];
  };
}

interface GraphQLRideResponse {
  allRides: {
    nodes: RideNode[];
  };
}

interface User {
  id: number;
  phoneNumber: string;
  profileImage: string;
  lastName: string;
  firstName: string;
  gender: string;
  email: string;
  age: number;
}

interface UserRide {
  userId: number;
  status: UserRideStatus;
  userByUserId: User;
}

interface RideNode {
  ownerId: number;
  id: number;
  userRidesByRideId: {
    nodes: UserRide[];
  };
}

interface GraphQLRideResponse {
  allRides: {
    nodes: RideNode[];
  };
}

const fetchRidersByRideId = async (rideId: number): Promise<Rider[]> => {
  const query = getRidersForRide(rideId);

  const data = await graphqlRequest<GraphQLRideResponse>(query);

  const riders: Rider[] = data.allRides.nodes.flatMap((node) =>
    node.userRidesByRideId.nodes
      .filter((userRide) => userRide.userByUserId.id !== node.ownerId)
      .map((userRide) => ({
        id: userRide.userByUserId.id,
        name: `${userRide.userByUserId.firstName} ${userRide.userByUserId.lastName}`,
        gender: userRide.userByUserId.gender as Gender,
        avatarUrl: userRide.userByUserId.profileImage,
        phoneNumber: userRide.userByUserId.phoneNumber,
      })),
  );

  return riders;
};

export { fetchRidersByRideId };
