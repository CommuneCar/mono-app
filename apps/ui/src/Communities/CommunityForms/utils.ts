import { isEmpty, uniq } from 'lodash';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { Community, User } from '@communecar/types';

const getIsUserConnectedToCommunity = (
  user: UsersSelectorOption,
  communityId: number,
) => {
  return !isEmpty(
    user.communitiesStatus.filter(
      (currentCommunity) => currentCommunity.communityId === communityId,
    ),
  );
};

const getIntersectionManagersMembers = <T>(
  admins: T[],
  members: T[],
  getId: (item: T) => any,
): { adminsResults: T[]; membersResults: T[] } => {
  const adminsSet = new Set(admins.map(getId));

  const overlapMembers = members.filter((member) =>
    adminsSet.has(getId(member)),
  );
  const adminsResults = [...admins, ...overlapMembers];

  const membersResults = members.filter(
    (member) => !adminsSet.has(getId(member)),
  );

  return { adminsResults, membersResults };
};

const getAdditionsDetailForCommunity = (
  newAdmins: UsersSelectorOption[],
  newMembers: UsersSelectorOption[],
  community: Community,
  user: User | null,
) => {
  const newMembersPictures = [...newAdmins, ...newMembers].map(
    (user) => user.avatarUrl,
  );
  const newMembersValidPictures = newMembersPictures.filter(
    (url): url is string => url !== null,
  );

  const picturesUrl = uniq([
    ...community.picturesUrl,
    ...newMembersValidPictures,
  ]);
  const numberOfMembers = newMembersPictures.length + community.numberOfMembers;
  const currentUser: User[] =
    user && !community.ownersUsers?.includes(user) ? [user] : [];
  const ownersUsers = uniq([...(community.ownersUsers ?? []), ...currentUser]);
  return {
    picturesUrl,
    numberOfMembers,
    ownersUsers,
  };
};

export {
  getIsUserConnectedToCommunity,
  getIntersectionManagersMembers,
  getAdditionsDetailForCommunity,
};
