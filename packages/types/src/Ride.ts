import { Driver } from './Driver';
import { User } from './User';

export interface Location {
  lat: number;
  lon: number;
  name?: string;
}

type RenameIdToUserId<T extends { id: any }> = Omit<T, 'id'> & {
  userId: T['id'];
};

export type UserLocation = Location &
  RenameIdToUserId<Pick<User, 'id' | 'firstName' | 'lastName' | 'phone'>>;

export interface Ride {
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
