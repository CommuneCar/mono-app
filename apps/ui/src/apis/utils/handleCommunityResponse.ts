import { Community } from '@communetypes/Community';
import { CommunityNode } from '../types/communitiesResponse';
import { Location } from '@communecar/types';

const handleCommunityResponse = (communityNode: CommunityNode): Community => {
  const picturesUrl = communityNode.userCommunitiesByCommunityId.nodes
    .map((userCommunity) => userCommunity.userByUserId.profileImage)
    .filter((url): url is string => url != null);
  const numberOfMembers =
    communityNode.userCommunitiesByCommunityId.totalCount ?? 1;
  return {
    ...communityNode,
    numberOfMembers,
    picturesUrl,
  };
};

const locationExtraction = (
  node: {
    long?: number;
    lat?: number;
    baseLocationName?: string;
  } & any,
): Location | undefined => {
  const coordinates =
    node.lat && node.long
      ? {
          lat: node.lat,
          lon: node.long,
        }
      : undefined;

  return coordinates
    ? { ...coordinates, name: node.baseLocationName }
    : undefined;
};

export { handleCommunityResponse, locationExtraction };
