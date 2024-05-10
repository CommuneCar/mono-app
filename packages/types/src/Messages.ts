export type Message = {
  id: string;
  userNameRequest: string;
  time: Date;
  entityName: string;
  type: MessageType;
  addresseeUserId: string[];
};

export type MessageType =
  | 'joiningRideRequest'
  | 'joiningCommunityRequest'
  | 'editRide';
