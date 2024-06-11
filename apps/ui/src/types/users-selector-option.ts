import { UserStatus, UserContactInfo } from '@communecar/types';

export type UsersSelectorOption = {
  label: string;
  userId: number;
  communitiesStatus: {
    communityId: number;
    status: UserStatus;
  }[];
} & UserContactInfo;
