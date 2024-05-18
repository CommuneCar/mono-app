import { UserStatus } from '@communetypes/Enums';

const queryDeleteUserCommunityStatus = (
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

const queryCreateUserCommunityStatus = (
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

export { queryDeleteUserCommunityStatus, queryCreateUserCommunityStatus };
