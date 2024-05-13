import { Gander } from './Enums';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gander: Gander;
  age?: number;
  avatarUrl?: string;
}
