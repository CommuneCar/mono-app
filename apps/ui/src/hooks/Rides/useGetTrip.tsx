import { useQuery } from 'react-query';
import { fetchTripRoute } from '../../apis/rides/fetch-trip';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import { TripRouteLocation } from '@communetypes/Trip';

const useGetTrip = (rideId: number) => {
  const { showMessage } = useSnackbar();

  const queryKey = ['allRides', rideId];
  const queryFn = () => fetchTripRoute(rideId);

  return useQuery<TripRouteLocation[], Error>(queryKey, queryFn, {
    onError: (error) => {
      console.error('Error fetching all rides:', error);
      showMessage(TEXT.alerts.FETCH_ALL_RIDES_FAILED, 'error');
    },
  });
};

export { useGetTrip };
