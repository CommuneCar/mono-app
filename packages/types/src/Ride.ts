import { Driver } from './Driver';

export interface Location {
  lat: number;
  lon: number;
  name?: string;
}

export interface Ride {
  id: string;
  driver: Driver;
  departureTime: Date;
  communityName: string;
  startLocationName: string;
  startLocation: [number, number];
  destinationName: string;
  destination: [number, number];
  pickups: Location[];
  png: string;
  gasMoney: number;
  pronouns: boolean;
  seats: number;
}
