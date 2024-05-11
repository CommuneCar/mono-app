import { User } from './User';

export type Message = {
  id: string;
  creatorUser: User;
  time: Date;
  entityName: string;
  type: MessageType;
  addresseeUsers: User[];
};

export type MessageType =
  | 'joiningRideRequest'
  | 'joiningCommunityRequest'
  | 'approvedCommunityRequest'
  | 'approvedRideRequest'
  | 'editRide';
