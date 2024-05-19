import { User } from './User';

type Message = {
  id: string;
  creatorUser: User;
  time: Date;
  entityId: number;
  entityName: string;
  type: MessageType;
  addresseeUsers: User[];
};

enum MessageType {
  EDIT_RIDE = 'editRide',
  JOINING_RIDE_REQUEST = 'joiningRideRequest',
  JOINING_COMMUNITY_REQUEST = 'joiningCommunityRequest',
  APPROVED_COMMUNITY_REQUEST = 'approvedCommunityRequest',
  APPROVED_RIDE_REQUEST = 'approvedRideRequest',
  DECLINE_COMMUNITY_REQUEST = 'declinedCommunityRequest',
  DECLINE_RIDE_REQUEST = 'declinedRideRequest',
}

export type { Message };
export { MessageType };
