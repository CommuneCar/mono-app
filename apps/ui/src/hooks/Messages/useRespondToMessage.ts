import { useMutation } from 'react-query';

import { Message } from '@communecar/types';

import { TEXT } from '../../themes/default/consts';
import { RequestActions } from '../../types/actions';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { respondToMessage } from '../../apis/messages/respondToMessage';

const useRespondToMessage = () => {
  const { showMessage } = useSnackbar();

  return useMutation(
    async (params: { message: Message; action: RequestActions }) => {
      try {
        await respondToMessage(params.message, params.action);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      onError: (error: any) => {
        console.error('Error responding to message', error);
        showMessage(TEXT.alerts.REQUEST_FAILED);
      },
      onSuccess: () => {
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST);
      },
    },
  );
};

export { useRespondToMessage };
