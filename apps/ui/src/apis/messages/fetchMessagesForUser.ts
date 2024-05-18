import { Message } from '@communecar/types';
import { fetchJoinCommunitiesMessagesForUser } from './fetchJoinCommunityMessagesForUser';
import { useQuery } from 'react-query';

const fetchMessagesForUser = async (userId: number): Promise<Message[]> => {
  const joinRequests = await fetchJoinCommunitiesMessagesForUser(userId);
  // add here other types of messages

  return joinRequests;
};

const useGetUserMessages = (userId: number) =>
  useQuery<Message[], Error>([userId, 'getUserMessages'], () =>
    fetchMessagesForUser(userId),
  );

export { useGetUserMessages };
