import { useQuery } from 'react-query';
import { Community } from '@communecar/types';
import { fetchAllCommunities } from '../../apis/communities/fetchAllCommunities';

export const useGetAllCommunities = () => {
  return useQuery<Community[], Error>('communities', fetchAllCommunities);
};
