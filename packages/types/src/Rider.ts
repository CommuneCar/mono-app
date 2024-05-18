import { Gender } from './Enums';

interface Rider {
  id: string;
  name: string;
  gender: Gender;
  avatarUrl?: string;
}

export type { Rider };
