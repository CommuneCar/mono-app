import { Driver } from './Driver';

export interface Ride {
  driver: Driver;
  departureTime: Date;
  communityName: string;
  startLocationName: string;
  startLocation: [number, number];
  destinationName: string;
  destination: [number, number];
  png: string;
  gasMoney?: number;
  pronouns?: boolean;
  seats: number;
}
