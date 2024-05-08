import { useState } from 'react';
import { Community } from '@communecar/types';
import { postUpdateCommunity } from '../../apis/communities/update-community';

const useUpdateCommunity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCommunity = async (community: Community) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCommunity = await postUpdateCommunity(community);
      setIsLoading(false);
      return updatedCommunity;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return { updateCommunity, isLoading, error };
};

export { useUpdateCommunity };
