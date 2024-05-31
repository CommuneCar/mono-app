import { User } from '@communetypes/User';

export type UsersSelectorOption = {
  label: string;
  userId: number;
} & UsersContactInfo;

export type UsersContactInfo = Pick<User, 'email' | 'phone' | 'avatarUrl'>;
