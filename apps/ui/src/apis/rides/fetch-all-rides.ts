import { graphqlRequest } from '../graphql';
import {
  Gender,
  RenameIdToUserId,
  Ride,
  User,
  UserLocation,
  UserRideStatus,
} from '@communecar/types';
import { geocode } from '../location/location';

interface GraphQLRideNode {
  id: number;
  ownerId: number;
  fromLat: number;
  fromLong: number;
  fromName?: string;
  toLat: number;
  toLong: number;
  toName?: string;
  startTime: string;
  gasMoney?: number;
  pronouns?: boolean;
  seats: number;
  communityByCommunityId: {
    title: string;
  };
  userRidesByRideId: {
    nodes: Array<{
      userByUserId?: {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        profileImage: string;
        gender: string;
        email: string;
        age: number;
      };
      fromLat: number;
      fromLong: number;
      fromName?: string;
      toLat: number;
      toLong: number;
      toName?: string;
      status: UserRideStatus;
      userId: string;
    }>;
  };
}

const fetchAllRides = async (): Promise<Ride[]> => {
  const query = `{
    allRides {
      nodes {
        id
        ownerId
        fromLat
        fromLong
        toLat
        toLong
        startTime
        gasMoney
        pronouns
        seats
        fromName
        toName
        communityByCommunityId{
          title
        }
        userRidesByRideId {
          nodes {
            userByUserId {
              id
              firstName
              lastName
              phoneNumber
              profileImage
              gender
              email
            }
            fromLat
            fromLong
            rideId
            toLat
            toLong
            status
            userId
          }
        }
      }
    }
  }  
`;

  const data = await graphqlRequest<{ allRides: { nodes: GraphQLRideNode[] } }>(
    query,
  );

  const rides: Ride[] = await Promise.all(
    data.allRides.nodes.map(async (node) => {
      const { fromName, fromLat, fromLong, toName, toLat, toLong, id } = node;

      const driver = (await getDriver(node.ownerId)) as User;

      const pickups: UserLocation[] = await Promise.all(
        node.userRidesByRideId.nodes
          .filter((node) => node.status == UserRideStatus.CONFIRMED)
          .map(async (pickupNode) => {
            const user: RenameIdToUserId<Omit<User, 'password'>> = {
              userId: pickupNode.userByUserId?.id ?? -1,
              firstName: pickupNode.userByUserId?.firstName ?? '',
              lastName: pickupNode.userByUserId?.lastName ?? '',
              phone: pickupNode.userByUserId?.phoneNumber ?? '',
              email: pickupNode.userByUserId?.email ?? '',
              gender:
                (pickupNode.userByUserId?.gender as Gender) ?? Gender.OTHER,
              avatarUrl: pickupNode.userByUserId?.profileImage,
              age: pickupNode.userByUserId?.age ?? 0,
            };
            return {
              lat: pickupNode.fromLat,
              lon: pickupNode.fromLong,
              name:
                pickupNode.fromName ??
                (await geocode({
                  lat: pickupNode.fromLat,
                  lon: pickupNode.fromLong,
                })),
              displayName: '',
              ...user,
            };
          }) ?? [],
      );

      const startLocationName =
        fromName ??
        (await geocode({
          lat: fromLat,
          lon: fromLong,
        }));

      const destinationName =
        toName ??
        (await geocode({
          lat: toLat,
          lon: toLong,
        }));

      return {
        id,
        driver,
        departureTime: new Date(node.startTime),
        communityName: node.communityByCommunityId?.title,
        startLocationName,
        startLocation: [node.fromLat, node.fromLong],
        destinationName,
        destination: [node.toLat, node.toLong],
        png: '',
        gasMoney: node.gasMoney ?? 0,
        pronouns: node.pronouns ?? false,
        seats: node.seats,
        pickups,
      };
    }),
  );
  return rides;
};

const getDriver = async (userId: number): Promise<Omit<User, 'password'>> => {
  const userQuery = `{
    userById(id: ${userId}){
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      age
      profileImage
    }
  }`;

  const data = await graphqlRequest<{
    userById: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      gender: string;
      age: number;
      profileImage: string;
    };
  }>(userQuery);

  return {
    ...data.userById,
    phone: data.userById.phoneNumber,
    avatarUrl: data.userById.profileImage,
    gender: data.userById.gender as Gender,
  };
};

export { fetchAllRides };
