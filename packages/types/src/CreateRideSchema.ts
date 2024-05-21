import { Ride } from './Ride';

export type CreateRideSchema = Omit<Ride, 'id'> & { communityId: number };
