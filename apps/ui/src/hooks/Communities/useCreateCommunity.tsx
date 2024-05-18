import { Community } from '@communecar/types';
import { postNewCommunity } from '../../apis/communities/createCommnuity';

import { useMutation } from 'react-query';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useCreateCommunity = (userId: number) => {
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
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
    },
  );

  const addCommunity = async (community: Omit<Community, 'id'>) => {
    try {
      const createdCommunity = await mutation.mutateAsync(community);
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
