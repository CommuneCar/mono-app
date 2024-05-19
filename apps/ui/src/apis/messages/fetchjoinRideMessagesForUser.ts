import { Message, MessageType, User } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { isEmpty } from 'lodash';

const fetchJoinRideMessages = async (userId: number): Promise<Message[]> => {
  const allUserOwnerRidesQuery = `{
        allRides(condition: {ownerId: ${userId}}){
            nodes{
                id
            }
        }
    }`;

  const currentUserQuery = `{
        userById(id: ${userId}) {
            id
            firstName
            lastName
            email
            phoneNumber
            gender
            age
        }
    }`;

  const currentUser = await graphqlRequest<{ userById: User }>(
    currentUserQuery,
  );

  const allUserOwnerRides = await graphqlRequest<{
    allRides: { nodes: { id: number }[] };
  }>(allUserOwnerRidesQuery).then((result) =>
    result.allRides.nodes.map((node) => node.id),
  );

  if (!isEmpty(allUserOwnerRides)) {
    const allPendingUsersQuery = getPendingUsersQuery(allUserOwnerRides);

    const allPendingUsers = await graphqlRequest<
      Record<
        string,
        {
          id: number;
          toLat: number;
          toLong: number;
          modificationTs: Date;
          userRidesByRideId: {
            nodes: { status: string; userByUserId: User }[];
          };
        }
      >
    >(allPendingUsersQuery);

    return Object.values(allPendingUsers).flatMap((ride) => {
      const pendingUsers = ride.userRidesByRideId.nodes.filter(
        (node) => node.status === 'Pending',
      );

      return pendingUsers.map((user) => ({
        id: ride.id + user.userByUserId.id + user.userByUserId.lastName,
        type: MessageType.JOINING_RIDE_REQUEST,
        addresseeUsers: [currentUser.userById],
        entityId: ride.id,
        entityName: 'test',
        time: ride.modificationTs,
        creatorUser: user.userByUserId,
      }));
    });
  }

  return [];
};

const getPendingUsersQuery = (rideIds: number[]) => {
  return `{
        ${rideIds.map((id) => {
          return `ride${id}: ${getBasePendingRideQuery(id)}`;
        })}
    }`;
};

const getBasePendingRideQuery = (rideId: number) => {
  return `rideById(id: ${rideId}) {
        id
        toLat
        toLong
        modificationTs
        userRidesByRideId {
          nodes {
            status
            userByUserId {
                id
                firstName
                lastName
                email
                phoneNumber
                gender
                age
            }
          }
        }
      }`;
};

export { fetchJoinRideMessages };
