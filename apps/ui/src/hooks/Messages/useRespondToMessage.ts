import { useState } from 'react';
import { RequestActions } from '../../types/actions';
import { respondToMessage } from '../../apis/messages/respondToMessage';

import { Message } from '@communecar/types';

const useRespondToMessage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitRespondToMessage = async (
    message: Message,
    action: RequestActions,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await respondToMessage(message, action);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      return false;
    }
  };

  return { submitRespondToMessage, isLoading, error };
};

export { useRespondToMessage };
