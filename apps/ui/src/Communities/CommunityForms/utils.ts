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

export { getIsUserConnectedToCommunity };
