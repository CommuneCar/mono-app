import { Driver } from './Driver';

export interface Ride {
  id: string;
  driver: Driver;
  departureTime: Date;
  communityName: string;
  startLocationName: string;
  startLocation: [number, number];
  destinationName: string;
  destination: [number, number];
  png: string;
}
