import { Community, UserStatus, User, Gender } from '@communecar/types';
import { CommunityNode, UserNode } from '../types/communitiesResponse';

const convertUserNodeToUser = (node: UserNode): User => {
  const {
    id,
    age,
    email,
    firstName,
    gender,
    lastName,
    password,
    phoneNumber,
    profileImage,
  } = node;
  return {
    id,
    age,
    email,
    firstName,
    gender: gender as Gender,
    lastName,
    password,
    phone: phoneNumber,
    avatarUrl: profileImage ?? undefined,
  };
};

const handleCommunityResponse = (communityNode: CommunityNode): Community => {
  const managers: User[] =
    communityNode.userCommunitiesByCommunityId.nodes
      .filter((node) => node.status === UserStatus.MANAGER)
      .map((manager) => convertUserNodeToUser(manager.userByUserId)) ?? [];

  const members: User[] = communityNode.userCommunitiesByCommunityId.nodes
    .filter((node) => node.status === UserStatus.ACTIVE)
    .map((member) => convertUserNodeToUser(member.userByUserId));

  const allMembers = [...managers, ...members];

  const picturesUrl = allMembers
    .map((member) => member.avatarUrl)
    .filter((url): url is string => url != null);

  const numberOfMembers = (managers?.length ?? 1) + (members?.length ?? 0);
  return {
    ...communityNode,
    numberOfMembers,
    picturesUrl,
    ownersUsers: managers,
  };
};

export { handleCommunityResponse };
