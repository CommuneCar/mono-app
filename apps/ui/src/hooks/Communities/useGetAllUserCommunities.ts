import { useQuery } from 'react-query';
import { Community } from '@communecar/types';
import { fetchAllUserCommunities } from '../../apis/communities/fetchUserCommunity';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useGetAllUserCommunities = (userId: number) => {
  const { showMessage } = useSnackbar();

  return useQuery<Community[], Error>(
    ['userCommunities', userId],
    () => fetchAllUserCommunities(userId),
    {
      onError(error) {
        console.error('Error fetching all user communities:', error);
        showMessage(TEXT.alerts.FETCH_ALL_USER_COMMUNITIES_FAILED, 'error');
      },
    },
  );
};

export { useGetAllUserCommunities };
