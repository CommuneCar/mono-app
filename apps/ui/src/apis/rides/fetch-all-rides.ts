import axios from 'axios';

import { LocationResult } from '@communetypes/Geocoding';

import { axiosClient } from '../client';
import { graphqlRequest } from '../graphql';
import { Ride, Rider, Driver } from '@communecar/types';

interface GraphQLRideNode {
  id: string;
  ownerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
  startTime: string;
  communityByCommunityId: {
    title: string;
  };
  userRidesByRideId: {
    nodes: Array<{
      userByUserId?: {
        id: string;
        firstName: string;
        lastName: string;
        profileImage: string;
        gender: string;
      };
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
        communityByCommunityId {
          title
        }
        userRidesByRideId {
          nodes {
            userByUserId {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  }`;

  const data = await graphqlRequest<{ allRides: { nodes: GraphQLRideNode[] } }>(
    query,
  );
  const rides: Ride[] = await Promise.all(
    data.allRides.nodes.map(async (node) => {
      const userNode = node.userRidesByRideId.nodes.find(
        (n) => n.userByUserId !== undefined,
      );

      const { fromLat, fromLong, toLat, toLong, id } = node;

      const driver = userNode?.userByUserId || {
        id: 'default',
        firstName: 'Unknown',
        lastName: 'Driver',
      };
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
          id: driver.id,
          name: `${driver.firstName} ${driver.lastName}`,
        },
        departureTime: new Date(node.startTime),
        communityName: node.communityByCommunityId?.title,
        startLocationName,
        startLocation: [node.fromLat, node.fromLong],
        destinationName,
        destination: [node.toLat, node.toLong],
        png: '',
        id: id,
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

export const fetchRidesDriver = async (
  rideId: number,
): Promise<Driver | undefined> => {
  const query = `{
    allRides(condition: { id: ${rideId} }) {
       nodes {
        id
        ownerId
        userRidesByRideId {
          nodes {
            userByUserId {
              id
              firstName
              lastName
              profileImage
              gender
            }
          }
        }
      }
    }
  }`;

  const data = await graphqlRequest<{ allRides: { nodes: GraphQLRideNode[] } }>(
    query,
  );
  for (const node of data.allRides.nodes) {
    const userNode = node.userRidesByRideId.nodes.find(
      (n) => n.userByUserId !== undefined,
    );

    const { ownerId } = node;

    const isDriver = userNode?.userByUserId?.id === ownerId;

    if (isDriver) {
      return {
        id: userNode?.userByUserId?.id,
        name: `${userNode?.userByUserId?.firstName} ${userNode?.userByUserId?.lastName}`,
        pic: userNode?.userByUserId?.profileImage,
      } as Driver;
    }
  }

  return undefined;
};

export const fetchRidersByRideId = async (rideId: string): Promise<Rider[]> => {
  const query = `{
    allRides(condition: { id: ${rideId} }) {
       nodes {
        id
        ownerId
        userRidesByRideId {
          nodes {
            userByUserId {
              id
              firstName
              lastName
              profileImage
              gender
            }
          }
        }
      }
    }
  }`;

  const data = await graphqlRequest<{ allRides: { nodes: GraphQLRideNode[] } }>(
    query,
  );
  const riderPromises = data.allRides.nodes.map(async (node) => {
    const userNode = node.userRidesByRideId.nodes.find(
      (n) => n.userByUserId !== undefined,
    );

    const { ownerId } = node;

    const isDriver = userNode?.userByUserId?.id === ownerId;

    if (!isDriver) {
      return {
        id: userNode?.userByUserId?.id,
        name: `${userNode?.userByUserId?.firstName} ${userNode?.userByUserId?.lastName}`,
        gender: userNode?.userByUserId?.gender,
        pic: userNode?.userByUserId?.profileImage,
      } as Rider;
    }
    return undefined;
  });

  const riders = (await Promise.all(riderPromises)).filter(
    (rider): rider is Rider => rider !== undefined,
  );

  return riders;
};
