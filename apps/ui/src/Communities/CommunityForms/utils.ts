import { UsersSelectorOption } from '../../types/users-selector-option';

const getIsUserConnectedToCommunity = (
  user: UsersSelectorOption,
  communityId: number,
) => {
  console.log(user, communityId);
};

//   const newAdminsToUpdate = newAdmins.filter((user) =>
//     user.communitiesStatus.filter(
//       (currentCommunity) =>
//         currentCommunity.communityId === updatedCommunity.id,
//     ),

export { getIsUserConnectedToCommunity };
