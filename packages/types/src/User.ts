import { Gender } from './Enums';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gander: Gender;
  age?: number;
  avatarUrl?: string;
}

export type { User };
