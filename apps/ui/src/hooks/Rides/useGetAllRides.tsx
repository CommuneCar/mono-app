import { useQuery } from 'react-query';
import { fetchAllRides } from '../../apis/rides/fetch-all-rides';
import { Ride } from '@communecar/types';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useGetAllRides = () => {
  const { showMessage } = useSnackbar();

  return useQuery<Ride[], Error>('rides', fetchAllRides, {
    onError(error) {
      console.error('Error fetching all rides:', error);
      showMessage(TEXT.alerts.FETCH_ALL_RIDES_FAILED, 'error');
    },
  });
};

export { useGetAllRides };
