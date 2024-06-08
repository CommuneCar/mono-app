import { Community } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import { getFetchAllCommunitiesQuery } from '../utils/communitiesQueries';
import { AllCommunitiesData } from '../types/communitiesResponse';
import { locationExtraction } from '../location/location';

const fetchAllCommunities = async (): Promise<Community[]> => {
  const query = getFetchAllCommunitiesQuery();

  const data = await graphqlRequest<AllCommunitiesData>(query);

  const allCommunities = data.allCommunities.nodes.map(
    async (node): Promise<Community> => {
      const location =
        node.lat && node.long ? await locationExtraction(node) : undefined;

      const picturesUrlsResponse = node.userCommunitiesByCommunityId.nodes.map(
        (userCommunity) => userCommunity.userByUserId.profileImage,
      );

      const picturesUrl: string[] = picturesUrlsResponse.filter(
        (url): url is string => url !== null,
      );

      const { id, title, description } = node;

      const community: Community = {
        id,
        title,
        description,
        numberOfMembers: node.userCommunitiesByCommunityId.nodes.length,
        location,
        picturesUrl,
      };
      return community;
    },
  );

  return Promise.all(allCommunities);
};

export { fetchAllCommunities };
