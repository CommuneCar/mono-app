import { UserRideStatus } from './Enums';

interface UserRide {
  userId: number;
  rideId: number;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
  status: UserRideStatus;
}

export type { UserRide };
