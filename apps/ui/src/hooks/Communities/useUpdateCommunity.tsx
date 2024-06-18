import { Community, UserStatus } from '@communecar/types';
import { postUpdateCommunity } from '../../apis/communities/update-community';
import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { UsersSelectorOption } from '../../types/users-selector-option';
import {
  getIntersectionManagersMembers,
  getIsUserConnectedToCommunity,
} from '../../Communities/CommunityForms/utils';
import { useUserCommunity } from './useSelectUsers';

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();
  const { createUserCommunity, updateUserCommunity } = useUserCommunity();

  const mutation = useMutation(
    (community: Community) => {
      return postUpdateCommunity(community);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('communities');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError(error) {
        console.error(error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  const handleConnectUsersInUpdate = async (
    communityId: number,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    const { adminsResults, membersResults } = getIntersectionManagersMembers(
      newAdmins,
      newMembers,
      (user) => user.userId,
    );

    const newAdminsToUpdate = adminsResults.filter((user) =>
      getIsUserConnectedToCommunity(user, communityId),
    );
    const newAdminsToCreate = adminsResults.filter(
      (user) => !getIsUserConnectedToCommunity(user, communityId),
    );

    const adminToCreatePromises = newAdminsToCreate.map((admin) =>
      createUserCommunity({
        userId: admin.userId,
        communityId,
        status: UserStatus.MANAGER,
      }),
    );
    const adminToUpdatePromises = newAdminsToUpdate.map((admin) =>
      updateUserCommunity({
        userId: admin.userId,
        communityId,
        status: UserStatus.MANAGER,
      }),
    );

    const newMembersToUpdate = membersResults.filter((user) =>
      getIsUserConnectedToCommunity(user, communityId),
    );
    const newMembersToCreate = membersResults.filter(
      (user) => !getIsUserConnectedToCommunity(user, communityId),
    );

    const membersToCreatePromises = newMembersToCreate.map((current) =>
      createUserCommunity({
        userId: current.userId,
        communityId,
        status: UserStatus.ACTIVE,
      }),
    );

    const membersToUpdatePromises = newMembersToUpdate.map((current) =>
      updateUserCommunity({
        userId: current.userId,
        communityId,
        status: UserStatus.ACTIVE,
      }),
    );
    await Promise.all([
      ...adminToCreatePromises,
      ...adminToUpdatePromises,
      ...membersToCreatePromises,
      ...membersToUpdatePromises,
    ]);
  };

  const updateCommunity = async (
    community: Community,
    newAdmins: UsersSelectorOption[],
    newMembers: UsersSelectorOption[],
  ) => {
    try {
      const updatedCommunity = await mutation.mutateAsync(community);
      try {
        await handleConnectUsersInUpdate(community.id, newAdmins, newMembers);
      } catch (error) {
        console.error('Error handling user connections:', error);
        showMessage('Failed to update user community status.', 'error');
      }
      return updatedCommunity;
    } catch (error) {
      throw error;
    }
  };
  return {
    updateCommunity,
    isUpdating: mutation.isLoading,
    error: mutation.error,
  };
};
