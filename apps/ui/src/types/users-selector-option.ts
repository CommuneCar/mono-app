import { UserStatus } from '@communetypes/Enums';
import { User } from '@communetypes/User';

export type UsersSelectorOption = {
  label: string;
  userId: number;
  communitiesStatus: {
    communityId: number;
    status: UserStatus;
  }[];
} & UsersContactInfo;

export type UsersContactInfo = Pick<User, 'email' | 'phone' | 'avatarUrl'>;
