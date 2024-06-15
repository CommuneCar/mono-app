// /src/hooks/useUserCommunity.ts
import { useMutation, useQueryClient } from 'react-query';
import { UserStatus } from '@communecar/types';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import {
  createUserCommunityStatus,
  updateUserCommunityStatus,
} from '../../apis/communities/update-user-community-status';

const useUserCommunity = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  const createMutation = useMutation(
    ({
      userId,
      communityId,
      status,
    }: {
      userId: number;
      communityId: number;
      status: UserStatus;
    }) => createUserCommunityStatus(userId, communityId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userCommunities');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  const updateMutation = useMutation(
    ({
      userId,
      communityId,
      status,
    }: {
      userId: number;
      communityId: number;
      status: UserStatus;
    }) => updateUserCommunityStatus(userId, communityId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userCommunities');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  return {
    createUserCommunity: createMutation.mutateAsync,
    updateUserCommunity: updateMutation.mutateAsync,
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    createError: createMutation.error,
    updateError: updateMutation.error,
  };
};

export { useUserCommunity };
