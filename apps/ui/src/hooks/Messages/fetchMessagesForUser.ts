import { useQuery } from 'react-query';

import { Message } from '@communecar/types';

import { TEXT } from '../../themes/default/consts';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { fetchJoinCommunitiesMessagesForUser } from '../../apis/messages/fetchJoinCommunityMessagesForUser';

const fetchMessagesForUser = async (userId: number): Promise<Message[]> => {
  const joinRequests = await fetchJoinCommunitiesMessagesForUser(userId);
  // add here other types of messages

  return joinRequests;
};

const useGetUserMessages = (userId: number) => {
  const { showMessage } = useSnackbar();

  return useQuery<Message[], Error>(
    [userId, 'getUserMessages'],
    () => fetchMessagesForUser(userId),
    {
      onError: (error: any) => {
        console.error('Error getting userMessages', error);
        showMessage(TEXT.alerts.REQUEST_FAILED, 'error');
      },
      onSuccess: () => {
        showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      },
    },
  );
};

export { useGetUserMessages };
