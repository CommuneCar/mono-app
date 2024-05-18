import { graphqlRequest } from '../graphql';
import { Community } from '@communecar/types';
import { getUpdateCommunityQuery } from '../utils/communitiesQueries';
import { UpdateCommunityResponse } from '../types/communitiesResponse';

const postUpdateCommunity = async (
  community: Community,
): Promise<Community> => {
  const query = getUpdateCommunityQuery(community);

  try {
    const data = await graphqlRequest<UpdateCommunityResponse>(query);
    const picturesUrl =
      data.updateCommunityById.community.userCommunitiesByCommunityId.nodes
        .map((userCommunity) => userCommunity.userByUserId.profileImage)
        .filter((url): url is string => url != null);
    const numberOfMembers =
      data.updateCommunityById.community.userCommunitiesByCommunityId
        .totalCount ?? 1;
    const dataResults: Community = {
      ...data.updateCommunityById.community,
      numberOfMembers,
      picturesUrl,
    };

    return dataResults;
  } catch (error) {
    console.error('Error updating community:', error);
    throw error;
  }
};

export { postUpdateCommunity };
