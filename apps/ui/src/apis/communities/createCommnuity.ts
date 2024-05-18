import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';

interface CreateCommunityResponse {
  createCommunity: {
    community: Community;
  };
}

const postNewCommunity = async (
  communityNew: Omit<Community, 'id'>,
  userId: number,
): Promise<Community> => {
  const createCommunityQuery = `
    mutation {
  createCommunity(
    input: {
      community: {
        ownerId: ${userId}, 
        title: "${communityNew.title}",
         description: "${communityNew.description}"
      }
    }
  ) {
    community {
      id
      ownerId
      title
      description
      lat
      long
    }
  }
}
  `;
  try {
    const data =
      await graphqlRequest<CreateCommunityResponse>(createCommunityQuery);
    return data.createCommunity.community;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

export { postNewCommunity };
