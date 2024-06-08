import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { postUpdateRiders } from '../../apis/rides/edit-ride';
import { Rider } from '@communetypes/Rider';

const useEditRider = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(
    async ([rider, rideId]: [Rider, number]) => postUpdateRiders(rider, rideId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rides');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};

export { useEditRider };
