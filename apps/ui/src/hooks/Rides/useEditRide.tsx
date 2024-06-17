import { useMutation, useQueryClient } from 'react-query';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { postUpdateRide } from '../../apis/rides/edit-ride';
import { EditRideSchema } from '@communetypes/EditRideSchema';

const useEditNewRide = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(async (ride: EditRideSchema) => postUpdateRide(ride), {
    onSuccess: () => {
      queryClient.invalidateQueries('rides');
      showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
    },
    onError: () => {
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    },
  });
};

export { useEditNewRide };
