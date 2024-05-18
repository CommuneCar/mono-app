import { Gender } from './Enums';

interface Rider {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  avatarUrl?: string;
}

export type { Rider };
