import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { cancelRideByRider } from '../../apis/rides/edit-ride';
import { Rider } from '@communetypes/Rider';

const useEditRider = (rideId: number) => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(async (rider: Rider) => cancelRideByRider(rider, rideId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['ridersByRideId', rideId]);
      showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
    },
    onError: () => {
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    },
  });
};

export { useEditRider };
