import { graphqlRequest } from '../graphql';
import { getRandomOption } from '../../utils';
import tlv from '../../assets/tlv.png';
import apple from '../../assets/apple.png';
import camera from '../../assets/camera.png';
import { axiosClient } from '../client';
import axios from 'axios';
import { LocationResult } from '@communetypes/Geocoding';

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
      };
    }>;
  };
}

interface Ride {
  driver: {
    id: string;
    name: string;
  };
  departureTime: Date;
  communityName: string;
  startLocationName: string;
  startLocation: [number, number];
  destinationName: string;
  destination: [number, number];
  png: string;
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
  const options = [tlv, apple, camera];
  const rides: Ride[] = await Promise.all(
    data.allRides.nodes.map(async (node) => {
      const userNode = node.userRidesByRideId.nodes.find(
        (n) => n.userByUserId !== undefined,
      );
      const driver = userNode?.userByUserId || {
        id: 'default',
        firstName: 'Unknown',
        lastName: 'Driver',
      };
      const startLocationName = await geocode({
        lat: node.fromLat,
        lon: node.fromLong,
      });
      const destinationName = await geocode({
        lat: node.toLat,
        lon: node.toLong,
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
        png: getRandomOption(options),
      };
    }),
  );
  return rides;
};

async function geocode(coords: { lat: number; lon: number }): Promise<string> {
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
}
