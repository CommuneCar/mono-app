import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';

interface UserNode {
  profileImage: string | null;
}

interface UserCommunityNode {
  userByUserId: UserNode;
}

interface CommunityNode {
  id: string;
  title: string;
  description: string;
  userCommunitiesByCommunityId: {
    nodes: UserCommunityNode[];
  };
}

interface CommunitiesData {
  allCommunities: {
    nodes: CommunityNode[];
  };
}

const fetchAllCommunities = async (): Promise<Community[]> => {
  const query = `
    query {
      allCommunities {
        nodes {
          id
          title
          description
          userCommunitiesByCommunityId {
            nodes {
              userByUserId {
                profileImage
              }
            }
          }
        }
      }
    }`;

  const data = await graphqlRequest<CommunitiesData>(query);

  return data.allCommunities.nodes.map((node): Community => {
    const picturesUrl = node.userCommunitiesByCommunityId.nodes
      .map((userCommunity) => userCommunity.userByUserId.profileImage)
      .filter((url): url is string => url != null);
    return {
      ...node,
      numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
      picturesUrl,
    };
  });
};

export { fetchAllCommunities };
