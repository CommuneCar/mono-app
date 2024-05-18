import { Community } from '@communetypes/Community';
import { CommunityNode } from '../types/communitiesResponse';

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

export { handleCommunityResponse };
