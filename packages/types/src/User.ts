import { Gender } from './Enums';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gender: Gender;
  age: number;
  avatarUrl?: string;
}

type UserContactInfo = Pick<User, 'email' | 'phone' | 'avatarUrl'>;

export type { User, UserContactInfo };
