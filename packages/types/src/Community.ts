import { UserRideStatus } from './Enums';
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

export interface UserCommunity {
  userId: number;
  communityId: number;
  status: UserRideStatus;
}
