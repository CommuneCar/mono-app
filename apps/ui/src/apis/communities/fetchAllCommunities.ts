import { Community } from "@communecar/types";
import { graphqlRequest } from "../graphql";

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
              }
            }
          }
        }
      }
    }`;
  
  const data = await graphqlRequest<CommunitiesData>(query);

  console.log("communities: ", data);
  return data.allCommunities.nodes.map((node): Community => {
    const pictures = node.userCommunitiesByCommunityId.nodes.map(userCommunity => userCommunity.userByUserId.profileImage).filter((url): url is string => url != null);
    return {
      id: node.id,
      name: node.title,
      description: node.description,
      numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
      picturesUrl: pictures
    };
  });
};
