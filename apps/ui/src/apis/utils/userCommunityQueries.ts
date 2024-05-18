import { UserStatus } from '@communetypes/Enums';

const getDeleteUserCommunityStatusQuery = (
  userId: number,
  communityId: number,
) => `
mutation {
  deleteUserCommunityByUserIdAndCommunityId(
    input: { userId: ${userId}, communityId: ${communityId} }
  ) {
    userCommunity {
      communityId
      status
      userId
    }
  }
}
`;

const getCreateUserCommunityStatusQuery = (
  userId: number,
  communityId: number,
  status: UserStatus,
) => {
  return `
mutation {
  createUserCommunity(
    input: { userCommunity: { userId: ${userId}, communityId: ${communityId}, status: "${status}" } }
  ) {
    userCommunityEdge {
      node {
        communityId
        status
        userId
      }
    }
  }
}
    `;
};

export { getDeleteUserCommunityStatusQuery, getCreateUserCommunityStatusQuery };
