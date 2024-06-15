import { UserStatus } from '@communetypes/Enums';
import { UserCommunitiesStatus } from '../../types/community-type';
import { graphqlRequest } from '../graphql';

interface UserCommunityNode {
  communityId: number;
  status: string;
  userId: number;
}
interface communityOwnerNode {
  id: number;
  ownerId: number;
  title: string;
}

interface AllUserCommunitiesResponse {
  allUserCommunities: {
    nodes: UserCommunityNode[];
  };
  allCommunities: {
    nodes: communityOwnerNode[];
  };
}

const USER_COMMUNITIES_STATUS_QUERY = `
query GetUserCommunitiesStatus($userId: Int!) {
  allUserCommunities(condition: {userId: $userId}) {
    nodes {
      communityId
      status
      userId
    }
  }
   allCommunities(condition: { ownerId: $userId }) {
    nodes {
      id
      ownerId
      title
    }
  }
}
`;

const fetchUserCommunitiesStatus = async (
  userId: number,
): Promise<UserCommunitiesStatus> => {
  const query = USER_COMMUNITIES_STATUS_QUERY;
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
