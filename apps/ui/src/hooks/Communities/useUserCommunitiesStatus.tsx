import { UserCommunitiesStatus } from '../../types/community-type';
import { fetchUserCommunitiesStatus } from '../../apis/communities/fetch-community-user-status';
import { useQuery } from 'react-query';

const useUserCommunitiesStatus = (userId: number) => {
  return useQuery<UserCommunitiesStatus, Error>({
    queryKey: ['userCommunitiesStatus', userId],
    queryFn: () => fetchUserCommunitiesStatus(userId),
  });
};

export { useUserCommunitiesStatus };
