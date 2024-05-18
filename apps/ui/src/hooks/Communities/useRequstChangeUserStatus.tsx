import { useMutation, useQueryClient } from 'react-query';

import { UserStatus } from '@communecar/types';
import {
  createUserCommunityStatus,
  deleteUserCommunityStatus,
} from '../../apis/communities/update-user-community-status';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useUserCommunityStatus = (userId: number, communityId: number) => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  const createMutation = useMutation(
    (status: UserStatus) =>
      createUserCommunityStatus(userId, communityId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userCommunitiesStatus', userId]);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  const deleteMutation = useMutation(
    () => deleteUserCommunityStatus(userId, communityId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userCommunitiesStatus', userId]);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  return {
    createMutation,
    deleteMutation,
    isCreatingStatus: createMutation.isLoading,
    isDeletingStatus: deleteMutation.isLoading,
  };
};

export { useUserCommunityStatus };
