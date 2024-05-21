import { useQuery } from 'react-query';
import { UserRidesStatus } from '../../types/ride-user-type';
import { fetchUserRides } from '../../apis/rides/fetch-user-ride-connections';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useGetUserRidesStatus = (userId: number) => {
  const { showMessage } = useSnackbar();

  return useQuery<UserRidesStatus, Error>(
    ['userRides', userId],
    () => fetchUserRides(userId),
    {
      onError(error) {
        console.error('Error in fetch user ride status', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};

export { useGetUserRidesStatus };
