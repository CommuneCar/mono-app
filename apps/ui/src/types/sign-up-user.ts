import { Gander } from '@communecar/types';

export type SignUpUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  gander: Gander;
  age?: number;
};
