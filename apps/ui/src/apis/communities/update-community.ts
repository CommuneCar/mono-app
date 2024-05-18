import { graphqlRequest } from '../graphql';
import { Community } from '@communecar/types';
import { getUpdateCommunityQuery } from '../utils/communitiesQueries';

interface UpdateCommunityResponse {
  updateCommunityById: {
    community: Community;
  };
}

const postUpdateCommunity = async (
  community: Community,
): Promise<Community> => {
  const query = getUpdateCommunityQuery(community);

  try {
    const data = await graphqlRequest<UpdateCommunityResponse>(query);
    return data.updateCommunityById.community;
  } catch (error) {
    console.error('Error updating community:', error);
    throw error;
  }
};

export { postUpdateCommunity };
