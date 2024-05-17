import { UserCommunitiesStatus } from '../../types/community-type';
import { fetchUserCommunitiesStatus } from '../../apis/communities/fetch-community-user-status';
import { useQuery } from '@tanstack/react-query';

const useUserCommunitiesStatus = (
  userId: string,
): UserCommunitiesStatus | undefined => {
  const { data, isLoading, error } = useQuery<UserCommunitiesStatus, Error>({
    queryKey: ['userCommunitiesStatus', userId],
    queryFn: () => fetchUserCommunitiesStatus(Number(userId)),
  });

  if (isLoading || error) return undefined;

  return data;
};

export { useUserCommunitiesStatus };
