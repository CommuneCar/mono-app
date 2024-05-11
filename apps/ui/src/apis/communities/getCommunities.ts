import { graphqlRequest } from '../graphql';

// Interface for the nested User data
interface UserNode {
  profileImage: string | null;
  id: string;
}

// Interface for the UserCommunities data
interface UserCommunityNode {
  userByUserId: UserNode;
}

// Interface for the Community data including the nested user communities
interface CommunityNode {
  id: string;
  title: string;
  description: string;
  userCommunitiesByCommunityId: {
    nodes: UserCommunityNode[];
  };
}

// Interface for the GraphQL query response
interface CommunitiesData {
  allCommunities: {
    nodes: CommunityNode[];
  };
}

// Interface to match the requested final type
export interface Community {
  id: string;
  name: string;
  description: string;
  numberOfMembers: number;
  picturesUrl: string[];
}

// Function to fetch all communities using the generic GraphQL handler
export const fetchAllCommunities = async (): Promise<Community[]> => {
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
                id
              }
            }
          }
        }
      }
    }`;

  const data = await graphqlRequest<CommunitiesData>(query);
  // Transform the data into the desired format
  return data.allCommunities.nodes.map((node): Community => {
    const pictures = node.userCommunitiesByCommunityId.nodes
      .map(uc => uc.userByUserId.profileImage)
      .filter((url): url is string => url != null);

    return {
      id: node.id,
      name: node.title,
      description: node.description,
      numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
      picturesUrl: pictures
    };
  });
};
