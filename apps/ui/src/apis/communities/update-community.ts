import { Community } from '@communecar/types';

const postUpdateCommunity = async (
  newCommunity: Community,
): Promise<Community> => {
  return { ...newCommunity };
};

export { postUpdateCommunity };
