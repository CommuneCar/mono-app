import { Gender } from './Enums';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gander: Gender;
  age?: number;
  avatarUrl?: string;
}
