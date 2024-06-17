import { useQuery } from 'react-query';
import { UsersSelectorOption } from '../../types/users-selector-option';
import { fetchAllUsers } from '../../apis/user/fetchAllUsers';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useGetAllUsersOptions = () => {
  const { showMessage } = useSnackbar();

  return useQuery<UsersSelectorOption[], Error>('allUsers', fetchAllUsers, {
    onError(error) {
      console.error('Error fetching all users:', error);
      showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
    },
  });
};

export { useGetAllUsersOptions };
