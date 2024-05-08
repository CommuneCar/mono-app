import { Community } from '@communecar/types';

const postNewCommunity = async (
  newCommunity: Community,
): Promise<Community> => {
  return { ...newCommunity };
};

export { postNewCommunity };
