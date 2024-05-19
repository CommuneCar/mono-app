import { Message } from '@communecar/types';
import { graphqlRequest } from '../graphql';

const getUpdateQuery = (
  userId: number,
  rideId: number,
  status: string,
): string => {
  return `mutation{
        updateUserRideByUserIdAndRideId(input: {
            userId: ${userId},
            rideId: ${rideId},
            userRidePatch: {
              status: "${status}"
            }
          }) {
            userRide {
              userId
              rideId
              status
            }
          }
    }`;
};

const acceptJoinRideRequest = async (message: Message) => {
  const joinRideQuery = getUpdateQuery(
    message.creatorUser.id,
    message.entityId,
    'Confirmed',
  );

  const response = await graphqlRequest<{
    updateUserRideByUserIdAndRideId: {
      userRide: { userId: number; rideId: number; status: string };
    };
  }>(joinRideQuery);

  return response;
};

const declineJoinRideRequest = async (message: Message) => {
  const declineRideQuery = getUpdateQuery(
    message.creatorUser.id,
    message.entityId,
    'Declined',
  );

  const response = await graphqlRequest<{
    updateUserRideByUserIdAndRideId: {
      userRide: { userId: number; rideId: number; status: string };
    };
  }>(declineRideQuery);

  return response;
};

export { declineJoinRideRequest, acceptJoinRideRequest };
