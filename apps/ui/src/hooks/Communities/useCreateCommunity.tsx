import { useState } from 'react';
import { Community } from '@communecar/types';
import { postNewCommunity } from '../../apis/communities/create-Community';

const useCreateCommunity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addCommunity = async (community: Community) => {
    setIsLoading(true);
    setError(null);
    try {
      const createdCommunity = await postNewCommunity(community);
      setIsLoading(false);
      return createdCommunity;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return { addCommunity, isLoading, error };
};

export { useCreateCommunity };
