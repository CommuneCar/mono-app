import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getCreateCommunityQuery } from '../utils/communitiesQueries';
import { CreateCommunityResponse } from '../types/communitiesResponse';
import { handleCommunityResponse } from '../utils/handleCommunityResponse';
import { locationExtraction } from '../location/location';

const postNewCommunity = async (
  newCommunity: Omit<Community, 'id'>,
  userId: number,
): Promise<Community> => {
  const query = getCreateCommunityQuery(userId, newCommunity);

  try {
    const data = await graphqlRequest<CreateCommunityResponse>(query);
    const result = handleCommunityResponse(data.createCommunity.community);
    const location = await locationExtraction(data.createCommunity.community);
    return { ...result, location: location };
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

export { postNewCommunity };
