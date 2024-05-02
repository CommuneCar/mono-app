import { Gander } from './Enums';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gander: Gander;
  age?: number;
  //TODO: profileImage
}
