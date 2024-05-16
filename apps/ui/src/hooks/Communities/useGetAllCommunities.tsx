import { fetchAllCommunities } from '../../apis/communities/fetchAllCommunities';

const useGetAllCommunities = () => {
  return fetchAllCommunities();
};

export { useGetAllCommunities };
