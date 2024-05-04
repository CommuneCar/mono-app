import { UserStatus } from '@communecar/types';
import { getRandomOption } from '../../utils';
import { useGetAllCommunities } from './useGetAllCommunities';
import { UserCommunitiesStatus } from '../../types/community-type';

const userStatusOptions: UserStatus[] = Object.values(
  UserStatus,
) as UserStatus[];

const useUserCommunitiesStatus = (userId: string): UserCommunitiesStatus => {
  const communities = useGetAllCommunities();
  console.log({ userId }); //TODO when the server ready

  const communitiesStatus: UserCommunitiesStatus = {};

  communities.forEach((community) => {
    communitiesStatus[community.id] = getRandomOption(
      userStatusOptions,
    ) as UserStatus;
  });
  //TODO: delete
  communitiesStatus[communities[0].id] = UserStatus.MANAGER;

  return communitiesStatus;
};

export { useUserCommunitiesStatus };
