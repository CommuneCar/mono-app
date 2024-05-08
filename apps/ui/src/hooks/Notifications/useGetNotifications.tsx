import { Notification } from '@communecar/types';

const notifications: Notification[] = [
  {
    id: '1',
    time: new Date(Date.now() + 120 * 60000),
    idUserRequest: '12',
    entityId: '13',
    type: 'joiningRequest',
  },
];

const useGetNotifications = (userId: string) => {
  return { notifications };
};

export { useGetNotifications };
