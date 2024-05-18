import { useMutation, useQueryClient } from 'react-query';
import { addNewRide } from '../../apis/rides/add-new-ride';
import { Ride } from '@communecar/types';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';

const useAddNewRide = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(
    async (ride: Ride) => addNewRide(ride),
    {
      onSuccess: () => {
        // Successfully added the ride, invalidate previous rides and fetch new values from the BE:
        queryClient.invalidateQueries('rides');
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    }
  );
};

export { useAddNewRide };