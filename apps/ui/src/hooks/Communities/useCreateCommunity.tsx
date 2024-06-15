// /src/hooks/communities/useCreateCommunity.ts
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { Community, UserStatus } from '@communecar/types';

import { TEXT } from '../../themes/default/consts';
import { postNewCommunity } from '../../apis/communities/createCommnuity';
import { createUserCommunityStatus } from '../../apis/communities/update-user-community-status';
import { isEmpty } from 'lodash';

const useCreateCommunity = (userId: number) => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  const mutation = useMutation<Community, Error, Omit<Community, 'id'>>(
    (newCommunity: Omit<Community, 'id'>) =>
      postNewCommunity(newCommunity, userId),
    {
      onError: (error: any) => {
        console.error('Error creating community:', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
      onSuccess: () => {
        queryClient.invalidateQueries('communities');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
    },
  );

  const handleUserConnections = async (
    communityId: number,
    adminsIds: number[],
    membersIds: number[],
  ) => {
    const adminPromises = adminsIds.map((adminId) =>
      createUserCommunityStatus(adminId, communityId, UserStatus.MANAGER),
    );

    const memberPromises = membersIds.map((memberId) =>
      createUserCommunityStatus(memberId, communityId, UserStatus.ACTIVE),
    );

    await Promise.all([...adminPromises, ...memberPromises]);
  };

  const addCommunity = async (
    community: Omit<Community, 'id'>,
    adminsIds: number[],
    membersIds: number[],
  ) => {
    try {
      const createdCommunity = await mutation.mutateAsync(community);
      try {
        await handleUserConnections(
          createdCommunity.id,
          isEmpty(adminsIds) ? [userId] : adminsIds,
          membersIds,
        );
      } catch (error) {
        console.error('Error handling user connections:', error);
        showMessage('Failed to update user community status.', 'error');
      }
      return createdCommunity;
    } catch (error) {
      throw error;
    }
  };

  return {
    addCommunity,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export { useCreateCommunity };
