import { graphqlRequest } from '../graphql';
import { Community, CommunityUpdate } from '@communecar/types';

const UpdateCommunityQuery = `
mutation UpdateCommunity($input: UpdateCommunityInput!){
  updateCommunityById(input: $input) {
    community {
      description
      id
      lat
      long
      ownerId
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
  communityId: number,
  communityPatch: CommunityUpdate,
): Promise<Community> => {
  const variables = {
    input: {
      id: communityId,
      communityPatch,
    },
  };

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
