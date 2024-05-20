import axios from 'axios';

import { LocationResult } from '@communecar/types/src/Geocoding';

import { axiosClient } from '../client';
import { graphqlRequest } from '../graphql';
import {
  Gender,
  RenameIdToUserId,
  Ride,
  User,
  UserLocation,
  UserRideStatus,
} from '@communecar/types';

interface GraphQLRideNode {
  id: string;
  ownerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
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
      };
      fromLat: number;
      fromLong: number;
      toLat: number;
      toLong: number;
      status: UserRideStatus;
      userId: string;
    }>;
  };
}

export const fetchAllRides = async (): Promise<Ride[]> => {
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
      communityByCommunityId {
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
      const { fromLat, fromLong, toLat, toLong, id } = node;

      const driver = node.userRidesByRideId.nodes.find(
        (node) => node.userByUserId !== undefined,
      )?.userByUserId || {
        id: -1,
        firstName: 'Unknown',
        lastName: 'Driver',
        phoneNumber: '1234567',
      };

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
              gander:
                (pickupNode.userByUserId?.gender as Gender) ?? Gender.OTHER,
              avatarUrl: pickupNode.userByUserId?.profileImage,
            };
            return {
              lat: pickupNode.fromLat,
              lon: pickupNode.fromLong,
              name: await geocode({
                lat: pickupNode.fromLat,
                lon: pickupNode.fromLong,
              }),
              displayName: '',
              ...user,
            };
          }) ?? [],
      );

      const startLocationName = await geocode({
        lat: fromLat,
        lon: fromLong,
      });

      const destinationName = await geocode({
        lat: toLat,
        lon: toLong,
      });

      return {
        driver: {
          id: Number(driver.id),
          name: `${driver.firstName} ${driver.lastName}`,
          phoneNumber: driver.phoneNumber,
        },
        departureTime: new Date(node.startTime),
        communityName: node.communityByCommunityId?.title,
        startLocationName,
        startLocation: [node.fromLat, node.fromLong],
        destinationName,
        destination: [node.toLat, node.toLong],
        png: '',
        id: Number(id),
        gasMoney: node.gasMoney ?? 0,
        pronouns: node.pronouns ?? false,
        seats: node.seats,
        pickups,
      };
    }),
  );
  return rides;
};

const geocode = async (coords: {
  lat: number;
  lon: number;
}): Promise<string> => {
  try {
    const response = await axiosClient.get<LocationResult[]>(
      '/api/v1/external/reverse-geocode',
      {
        params: { lat: coords.lat, lon: coords.lon },
      },
    );

    // Check if the array of results is not empty and return the display name of the first result
    if (response.data.length > 0 && response.data[0] !== undefined) {
      return response.data[0].name || response.data[0].displayName;
    } else {
      return 'Unknown location 😵‍💫';
    }
  } catch (error) {
    console.error('Geocoding error:', error); // Log any errors that occur during the request
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      return 'Unknown location 😵‍💫';
    }
    console.log(error);
    return 'An extremely unknown location 😵‍💫😵‍💫';
  }
};
