import { UserStatus } from '@communetypes/Enums';
import { UserCommunitiesStatus } from '../../types/community-type';
import { graphqlRequest } from '../graphql';

export interface UserCommunityNode {
  communityId: number;
  status: string;
  userId: number;
}

export interface AllUserCommunitiesResponse {
  allUserCommunities: {
    nodes: UserCommunityNode[];
  };
}

//   query GetUserCommunitiesStatus($userId: Int!) {
//      userCommunity (userId: $userId) {
//       communityId
//       status
//       community {
//         id
//         name
//       }
//     }
//   }
const GET_USER_COMMUNITIES_STATUS = `
query GetUserCommunitiesStatus($userId: Int!) {
  allUserCommunities(condition: {userId: $userId}) {
    nodes {
      communityId
      status
      userId
    }
  }
}
`;

const fetchUserCommunitiesStatus = async (
  userId: number,
): Promise<UserCommunitiesStatus> => {
  const query = GET_USER_COMMUNITIES_STATUS;
  const variables = { userId };

  try {
    const data = await graphqlRequest<AllUserCommunitiesResponse>(
      query,
      variables,
    );
    const communitiesStatus: UserCommunitiesStatus = {};

    data.allUserCommunities.nodes.forEach((item) => {
      communitiesStatus[item.communityId] = item.status as UserStatus;
    });

    return communitiesStatus;
  } catch (error) {
    console.error('Error fetching user communities status:', error);
    throw error;
  }
};

export { fetchUserCommunitiesStatus };
