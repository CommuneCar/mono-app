import { Driver } from './Driver';
import { User } from './User';

export interface Location {
  lat: number;
  lon: number;
  name?: string;
}

export type RenameIdToUserId<T extends { id: number }> = Omit<T, 'id'> & {
  userId: T['id'];
};

export type UserLocation = Location & RenameIdToUserId<Omit<User, 'password'>>;

export interface Ride {
  id: number;
  driver: Driver;
  departureTime: Date;
  communityName: string;
  startLocationName: string;
  startLocation: [number, number];
  destinationName: string;
  destination: [number, number];
  pickups: UserLocation[];
  png: string;
  gasMoney: number;
  pronouns: boolean;
  seats: number;
}
