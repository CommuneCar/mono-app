import { Ride } from './Ride';

export interface EditRideSchema extends Ride {
  id: number;
  communityId: number;
}
