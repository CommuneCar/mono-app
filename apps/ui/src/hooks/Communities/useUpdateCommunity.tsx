import { Community } from '@communecar/types';
import { postUpdateCommunity } from '../../apis/communities/update-community';
import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  const mutation = useMutation(
    (community: Community) => {
      return postUpdateCommunity(community);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['communities']);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError(error) {
        console.log(error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  return {
    updateCommunity: mutation.mutateAsync,
    isUpdating: mutation.isLoading,
    error: mutation.error,
  };
};
