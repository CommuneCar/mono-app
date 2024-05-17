import { Community } from '@communecar/types';
import { postNewCommunity } from '../../apis/communities/createCommnuity';

// const useCreateCommunity = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const addCommunity = async (community: Community) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const createdCommunity = await postNewCommunity(community);
//       setIsLoading(false);
//       return createdCommunity;
//     } catch (err: any) {
//       setError(err);
//       setIsLoading(false);
//       throw err;
//     }
//   };

//   return { addCommunity, isLoading, error };
// };

import { useMutation } from 'react-query';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { TEXT } from '../../themes/default/consts';

const useCreateCommunity = () => {
  const { showMessage } = useSnackbar();
  const mutation = useMutation<Community, Error, Omit<Community, 'id'>>(
    (newCommunity: Omit<Community, 'id'>) => postNewCommunity(newCommunity),
    {
      onError: (error: any) => {
        console.error('Error creating community:', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
      onSuccess: () => {
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
    },
  );

  const addCommunity = async (community: Omit<Community, 'id'>) => {
    try {
      const createdCommunity = await mutation.mutateAsync(community);
      return createdCommunity;
    } catch (error) {
      throw error;
    }
  };

  return {
    addCommunity,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export { useCreateCommunity };
