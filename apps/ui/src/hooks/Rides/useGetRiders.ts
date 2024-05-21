import { useQuery } from 'react-query';
import { Rider } from '@communecar/types';
import { fetchRidersByRideId } from '../../apis/rides/fetch-riders';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

export const useGetRidersByRideId = (rideId: number) => {
  const { showMessage } = useSnackbar();

  return useQuery<Rider[], Error>(
    ['ridersByRideId', rideId],
    () => fetchRidersByRideId(rideId),
    {
      onError(error) {
        console.error('Error in fetch riders for a ride', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};
