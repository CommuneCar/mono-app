import { UserCommunitiesStatus } from '../../types/community-type';
import { fetchUserCommunitiesStatus } from '../../apis/communities/fetch-community-user-status';
import { useQuery } from 'react-query';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useUserCommunitiesStatus = (userId: number) => {
  const { showMessage } = useSnackbar();
  return useQuery<UserCommunitiesStatus, Error>({
    queryKey: ['userCommunitiesStatus', userId],
    queryFn: () => fetchUserCommunitiesStatus(userId),
    onError() {
      showMessage(TEXT.alerts.FETCH_COMMUNITIES_REQUEST_FAILED, 'error');
    },
  });
};

export { useUserCommunitiesStatus };
