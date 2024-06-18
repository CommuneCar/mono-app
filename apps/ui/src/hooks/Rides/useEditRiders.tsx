import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { cancelRideByRider } from '../../apis/rides/edit-ride';
import { Rider } from '@communetypes/Rider';
import { UserRideStatus } from '@communetypes/Enums';

const useEditRider = (rideId: number, status: UserRideStatus) => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(
    async (riderId: Rider['id']) => cancelRideByRider(riderId, rideId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['ridersByRideId', rideId]);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};

export { useEditRider };
