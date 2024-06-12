import { isEmpty } from 'lodash';
import { UsersSelectorOption } from '../../types/users-selector-option';

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

export { getIsUserConnectedToCommunity, getIntersectionManagersMembers };
