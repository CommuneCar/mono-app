import { Driver } from './Driver';
import { Ride } from './Ride';

export type CreateRideSchema = Omit<Ride, 'id'>;
