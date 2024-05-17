import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';

const CREATE_COMMUNITY_MUTATION = `
  mutation CreateCommunity($input: CreateCommunityInput!) {
    createCommunity(input: { community: $input }) {
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

interface CreateCommunityResponse {
  createCommunity: {
    community: Community;
  };
}

const postNewCommunity = async (
  communityNew: Omit<Community, 'id'>,
  userId: number,
): Promise<Community> => {
  const variables = {
    input: {
      community: {
        ownerId: userId,
        title: communityNew.name,
        description: communityNew.description,
      },
    },
  };

  try {
    const data = await graphqlRequest<CreateCommunityResponse>(
      CREATE_COMMUNITY_MUTATION,
      variables,
    );
    return data.createCommunity.community;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

export { postNewCommunity };
