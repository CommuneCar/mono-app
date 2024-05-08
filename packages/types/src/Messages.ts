export type Message = {
  id: string;
  userNameRequest: string;
  time: Date;
  entityName: string;
  type: 'joiningRequest' | 'editRide';
};
