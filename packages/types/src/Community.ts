import { Ride, Location } from './Ride';

export interface Community {
  id: number;
  title: string;
  description: string;
  location?: Location;
  numberOfMembers: number;
  picturesUrl: string[];
  rides?: Ride[];
}
