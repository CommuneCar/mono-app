import { Ride } from './Ride';

export interface Community {
  id: string;
  title: string;
  description: string;
  numberOfMembers: number;
  picturesUrl: string[];
  rides?: Ride[];
}
