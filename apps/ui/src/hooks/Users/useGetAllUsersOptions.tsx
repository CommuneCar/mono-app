import { useQuery } from 'react-query';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';
import { fetchRidersByCommunityId } from '../../apis/user/fetchUsersByCommunityId';

const useGetAllUsersOptions = () => {
  const { showMessage } = useSnackbar();

  return useQuery<UsersSelectorOption[], Error>('allUsers', fetchAllUsers, {
    onError(error) {
      console.error('Error fetching all users:', error);
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    },
  });
};

const useGetUsersByCommunityId = (communityId?: number) => {
  const { showMessage } = useSnackbar();

  return useQuery<UsersSelectorOption[], Error>(
    ['usersByCommunityId', communityId],
    () => (communityId ? fetchRidersByCommunityId(communityId) : []),
    {
      onError(error) {
        console.error('Error in fetch riders for a ride', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
    },
  );
};

export { useGetAllUsersOptions, useGetUsersByCommunityId };
