import { useState } from 'react';
import { RequestActions } from '../../types/actions';
import { respondToMessage } from '../../apis/messages/respondToMessage';

const useRespondToMessage = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitRespondToMessage = async (
    messageId: string,
    action: RequestActions,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await respondToMessage(messageId, action);
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
