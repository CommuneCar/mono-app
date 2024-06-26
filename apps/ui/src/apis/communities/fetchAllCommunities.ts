import { Community, Gender, User, UserStatus } from '@communecar/types';
import { graphqlRequest } from '../graphql';
import {
  getAllUserCommunityQuery,
  getFetchAllCommunitiesQuery,
} from '../utils/communitiesQueries';
import { AllCommunitiesData, UserNode } from '../types/communitiesResponse';
import { locationExtraction } from '../location/location';

const fetchAllCommunities = async (): Promise<Community[]> => {
  const query = getFetchAllCommunitiesQuery();
  const allCommunitiesData = await graphqlRequest<AllCommunitiesData>(query);

  const allUserCommunityQuery = getAllUserCommunityQuery();
  const allUserCommunityData = await graphqlRequest<AllUserCommunityData>(
    allUserCommunityQuery,
  );

  const membersAndAdmins = allUserCommunityData.allUserCommunities.nodes.filter(
    (node) =>
      node.status === UserStatus.ACTIVE || node.status === UserStatus.MANAGER,
  );

  const userCommunity = membersAndAdmins.reduce<MembersCommunityData>(
    (acc, node) => {
      const { communityId, status, userByUserId } = node;

      if (!acc[communityId]) {
        acc[communityId] = {
          numberOfMembers: 0,
          managers: [],
          picturesUrl: [],
        };
      }

      acc[communityId].numberOfMembers += 1;
      if (userByUserId.profileImage) {
        acc[communityId].picturesUrl = [
          ...acc[communityId].picturesUrl,
          userByUserId.profileImage,
        ];
      }

      if (status === UserStatus.MANAGER) {
        const manager: User = {
          ...userByUserId,
          avatarUrl: userByUserId.profileImage ?? undefined,
          phone: userByUserId.phoneNumber,
          gender: userByUserId.gender as Gender,
        };
        acc[communityId].managers = [...acc[communityId].managers, manager];
      }

      return acc;
    },
    {},
  );

  const allCommunities = allCommunitiesData.allCommunities.nodes.map(
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
        numberOfMembers: userCommunity[id]?.numberOfMembers ?? 0,
        location,
        picturesUrl,
        ownersUsers: userCommunity[id]?.managers ?? [],
      };
      return community;
    },
  );

  return Promise.all(allCommunities);
};

interface AllUserCommunityData {
  allUserCommunities: {
    nodes: {
      communityId: number;
      status: UserStatus;
      userId: number;
      userByUserId: UserNode;
    }[];
  };
}

type MembersCommunityData = {
  [key: number]: {
    numberOfMembers: number;
    managers: User[];
    picturesUrl: string[];
  };
};

export { fetchAllCommunities };
