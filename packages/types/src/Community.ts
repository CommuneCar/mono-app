import { Ride } from './Ride';

export interface Community {
  id: string;
  name: string;
  description: string;
  numberOfMembers: number;
  picturesUrl: string[];
  rides?: Ride[];
}
