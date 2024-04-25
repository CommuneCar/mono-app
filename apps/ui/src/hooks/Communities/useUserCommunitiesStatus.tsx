import { UserStatus } from '@communecar/types';
import { getRandomOption } from '../../utils';
import { useGetAllCommunities } from './useGetAllCommunities';
import { UserCommunitiesStatus } from '../../Communities/CommunityType';

const userStatusOptions: UserStatus[] = ['Approved', 'Pending', 'Rejected'];

const useUserCommunitiesStatus = (userId: string): UserCommunitiesStatus => {
  const communities = useGetAllCommunities();

  const communitiesStatus = communities.reduce((acc, community) => {
    acc[community.name] = getRandomOption(userStatusOptions) as UserStatus;
    return acc;
  }, {} as UserCommunitiesStatus);

  return communitiesStatus;
};

export { useUserCommunitiesStatus };
