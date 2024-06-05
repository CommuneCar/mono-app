import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getFetchAllCommunitiesQuery } from '../utils/communitiesQueries';
import { AllCommunitiesData } from '../types/communitiesResponse';
import { locationExtraction } from '../utils/handleCommunityResponse';

const fetchAllCommunities = async (): Promise<Community[]> => {
  const query = getFetchAllCommunitiesQuery();

  const data = await graphqlRequest<AllCommunitiesData>(query);

  return data.allCommunities.nodes.map((node): Community => {
    const location = locationExtraction(node);

    const picturesUrl = node.userCommunitiesByCommunityId.nodes
      .map((userCommunity) => userCommunity.userByUserId.profileImage)
      .filter((url): url is string => url != null);

    const { id, title, description, ownerId } = node;

    const community: Community = {
      id,
      title,
      description,
      ownerId,
      numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
      location,
      picturesUrl,
    } as Community;
    return community;
  });
};

export { fetchAllCommunities };
