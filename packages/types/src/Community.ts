import { Ride, Location } from './Ride';

export interface Community {
  id: string;
  title: string;
  description: string;
  location?: Location;
  numberOfMembers: number;
  picturesUrl: string[];
  rides?: Ride[];
}
export type CommunityUpdate = Partial<
  Pick<Community, 'title' | 'description' | 'location'>
>;
