import { useMutation, useQueryClient } from 'react-query';
import { UserRide } from '@communecar/types';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import { createUserRide } from '../../apis/rides/create-user-ride';

export const useCreateUserRide = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  const mutation = useMutation(
    ({
      userId,
      rideId,
      fromLat,
      fromLong,
      toLat,
      toLong,
      status,
    }: Partial<UserRide>) =>
      createUserRide(
        userId!,
        rideId!,
        fromLat!,
        fromLong!,
        toLat!,
        toLong!,
        status!,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['rides']);
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
      onError: () => {
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );

  return {
    createUserRide: mutation.mutateAsync,
    isCreating: mutation.isLoading,
    error: mutation.error,
  };
};
