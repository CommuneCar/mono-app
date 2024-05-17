import { useState, useEffect, useCallback } from 'react';
import { fetchMessagesForUser } from '../../apis/messages/fetchMessagesForUser';
import { Message } from '@communecar/types';

const useUserMessages = (userId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMessagesForUser(userId);
      setMessages(data);
    } catch (error) {
      setError(error as Error);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  return { messages, loading, error, setMessages };
};

export { useUserMessages };
