import { graphqlRequest } from '../graphql';
import { Community } from '@communecar/types';
import { getUpdateCommunityQuery } from '../utils/communitiesQueries';
import { UpdateCommunityResponse } from '../types/communitiesResponse';
import { handleCommunityResponse } from '../utils/handleCommunityResponse';

const postUpdateCommunity = async (
  community: Community,
): Promise<Community> => {
  const query = getUpdateCommunityQuery(community);

  try {
    const data = await graphqlRequest<UpdateCommunityResponse>(query);
    const result = handleCommunityResponse(data.updateCommunityById.community);
    return result;
  } catch (error) {
    console.error('Error updating community:', error);
    throw error;
  }
};

export { postUpdateCommunity };
