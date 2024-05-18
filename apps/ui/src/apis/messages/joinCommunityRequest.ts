import { Message, UserStatus } from '@communecar/types';
import { graphqlRequest } from '../graphql';

const getUpdateQuery = (
  userId: number,
  communityId: number,
  status: UserStatus,
): string => {
  return `mutation{
            updateUserCommunityByUserIdAndCommunityId(input: {
                userCommunityPatch: {
                    status: "${status}"
                },
                userId: ${userId},
                communityId: ${communityId}
            }) {
                userCommunity {
                    userId
                    communityId
                    status
                }
            }
      }`;
};

const acceptJoinCommunityRequest = async (message: Message) => {
  const joinCommunityQuery = getUpdateQuery(
    message.creatorUser.id,
    message.entityId,
    UserStatus.ACTIVE,
  );

  const response = await graphqlRequest<{
    updateUserCommunityByUserIdAndCommunityId: {
      userCommunity: { userId: number; communityId: number; status: string };
    };
  }>(joinCommunityQuery);

  return response;
};

const declineJoinCommunityRequest = async (message: Message) => {
  const rejectCommunityQuery = getUpdateQuery(
    message.creatorUser.id,
    message.entityId,
    UserStatus.REJECTED,
  );

  const response = await graphqlRequest<{
    updateUserCommunityByUserIdAndCommunityId: {
      userCommunity: { userId: number; communityId: number; status: string };
    };
  }>(rejectCommunityQuery);

  return response;
};

export { acceptJoinCommunityRequest, declineJoinCommunityRequest };
