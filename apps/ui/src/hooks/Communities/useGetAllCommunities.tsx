import { useQuery } from 'react-query';
import { Community } from '@communecar/types';
import { fetchAllCommunities } from '../../apis/communities/fetchAllCommunities';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useGetAllCommunities = () => {
  const { showMessage } = useSnackbar();

  return useQuery<Community[], Error>('communities', fetchAllCommunities, {
    onError(error) {
      console.error('Error fetching all rides:', error);
      showMessage(TEXT.alerts.FETCH_ALL_COMMUNITIES_FAILED, 'error');
    },
  });
};

export { useGetAllCommunities };
