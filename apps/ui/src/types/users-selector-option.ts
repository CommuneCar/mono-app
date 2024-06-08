import { User } from '@communetypes/User';

export type UsersSelectorOption = {
  label: string;
  userId: number;
  managedCommunitiesIds: number[];
  membershipCommunitiesIds: number[];
} & UsersContactInfo;

export type UsersContactInfo = Pick<User, 'email' | 'phone' | 'avatarUrl'>;
