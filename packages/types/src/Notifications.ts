import { Community } from './Community';

export type Ride = {
  driver: string;
  departureTime: Date;
  communityName: string;
  startLocation: string;
  destination: string;
  png: string;
};

export type Notification = {
  id: string;
  idUserRequest: string;
  time: Date;
  entityId: string;
  type: 'joiningRequest' | 'editRide';
};
