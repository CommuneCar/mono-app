import { graphqlRequest } from '../graphql';
import { Community } from '@communecar/types';

const UpdateCommunityQuery = `
  mutation UpdateCommunity($input: UpdateCommunityInput!) {
    updateCommunityById(input: $input) {
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

interface UpdateCommunityResponse {
  updateCommunityById: {
    community: Community;
  };
}

const postUpdateCommunity = async (
  community: Partial<Community>,
): Promise<Community> => {
  const variables = { input: { community } };

  try {
    const data = await graphqlRequest<UpdateCommunityResponse>(
      UpdateCommunityQuery,
      variables,
    );
    return data.updateCommunityById.community;
  } catch (error) {
    console.error('Error updating community:', error);
    throw error;
  }
};

export { postUpdateCommunity };
