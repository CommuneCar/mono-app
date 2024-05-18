import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getCreateCommunityQuery } from '../utils/communitiesQueries';
import { CreateCommunityResponse } from '../types/communitiesResponse';

const postNewCommunity = async (
  newCommunity: Omit<Community, 'id'>,
  userId: number,
): Promise<Community> => {
  const query = getCreateCommunityQuery(userId, newCommunity);

  try {
    const data = await graphqlRequest<CreateCommunityResponse>(query);
    return data.createCommunity.community;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

export { postNewCommunity };
