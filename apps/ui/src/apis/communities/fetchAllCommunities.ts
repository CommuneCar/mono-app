import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getFetchAllCommunitiesQuery } from '../utils/communitiesQueries';

interface UserNode {
  profileImage: string | null;
}

interface UserCommunityNode {
  userByUserId: UserNode;
}

interface CommunityNode {
  id: number;
  title: string;
  description: string;
  lat?: number;
  long?: number;
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
  const query = getFetchAllCommunitiesQuery();

  const data = await graphqlRequest<CommunitiesData>(query);

  return data.allCommunities.nodes.map((node): Community => {
    const location =
      node.lat && node.long
        ? {
            lat: node.lat,
            lon: node.long,
          }
        : undefined;

    const picturesUrl = node.userCommunitiesByCommunityId.nodes
      .map((userCommunity) => userCommunity.userByUserId.profileImage)
      .filter((url): url is string => url != null);
    const community = {
      ...node,
      numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
      picturesUrl,
    };
    return location ? { ...community, ...location } : community;
  });
};

export { fetchAllCommunities };
