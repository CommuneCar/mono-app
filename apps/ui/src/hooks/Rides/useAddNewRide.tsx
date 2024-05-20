import { useMutation, useQueryClient } from 'react-query';
import { addNewRide } from '../../apis/rides/add-new-ride';
import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { CreateRideSchema } from '@communetypes/CreateRideSchema';

const useAddNewRide = () => {
  const queryClient = useQueryClient();
  const { showMessage } = useSnackbar();

  return useMutation(async (ride: CreateRideSchema) => addNewRide(ride), {
    onSuccess: () => {
      queryClient.invalidateQueries('rides');
      showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
    },
    onError: () => {
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    },
  });
};

export { useAddNewRide };
