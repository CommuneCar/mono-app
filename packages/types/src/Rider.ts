import { Gender } from './Enums';

interface Rider {
  id: number;
  name: string;
  gender: Gender;
  avatarUrl?: string;
  phoneNumber: string;
}

export type { Rider };
