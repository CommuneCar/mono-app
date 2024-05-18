import { Gender } from './Enums';

interface Rider {
  id: string;
  name: string;
  gender: Gender;
  avatarUrl?: string;
  phoneNumber: string;
}

export type { Rider };
