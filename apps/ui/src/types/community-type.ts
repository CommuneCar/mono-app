import { Community, UserStatus } from '@communecar/types';

export type ClientCommunity = Community & {
  numberOfMembers: number;
  picturesUrl?: string[];
};

export type UserCommunitiesStatus = Record<string, UserStatus>;
