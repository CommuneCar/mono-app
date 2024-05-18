import { UserStatus } from '@communetypes/Enums';

const queryDeleteUserCommunityStatus = (
  userId: number,
  communityId: number,
) => `
  mutation {
    deleteUserCommunityByUserIdAndCommunityId(
      input: {
        userId: ${userId}
        communityId: ${communityId}
      }
    ) {
      deletedUserCommunityId
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

const queryUpdateUserCommunityStatus = (
  userId: number,
  communityId: number,
  status: UserStatus,
) => {
  return `mutation {
  updateUserCommunityByUserIdAndCommunityId(
    input: {
      userCommunityPatch: { status: "${status}" }
      userId: ${userId}
      communityId: ${communityId}
    }
  ) {
    userCommunity {
      status
      userId
      communityId
    }
  }
}
`;
};

export {
  queryDeleteUserCommunityStatus,
  queryCreateUserCommunityStatus,
  queryUpdateUserCommunityStatus,
};
