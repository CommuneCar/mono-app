import { useMutation, useQueryClient } from 'react-query';
import { postRequestToJoinRide } from '../../apis/rides/request-to-join-ride';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

export const useUpdateUserRideStatus = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(
    ({
      userId,
      rideId,
      status,
    }: {
      userId: number;
      rideId: number;
      status: string;
    }) => postRequestToJoinRide(userId, rideId, status),
    {
      onSuccess: (variables) => {
        queryClient.invalidateQueries(['userRides', variables.userId]);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: (error) => {
        console.error('Error updating user ride status:', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};
