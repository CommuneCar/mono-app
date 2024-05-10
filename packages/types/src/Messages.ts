export type Message = {
  id: string;
  userNameRequest: string;
  time: Date;
  entityName: string;
  type: MessageType;
};

export type MessageType =
  | 'joiningRideRequest'
  | 'joiningCommunityRequest'
  | 'editRide';
