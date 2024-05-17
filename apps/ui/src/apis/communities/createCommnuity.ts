import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';

// const postNewCommunity = async (
//   newCommunity: Community,
// ): Promise<Community> => {
//   return { ...newCommunity, id: newCommunity.name };
// };

// /src/apis/communities/createCommunity.ts

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
  community: Omit<Community, 'id'>,
): Promise<Community> => {
  const variables = { input: community };

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
