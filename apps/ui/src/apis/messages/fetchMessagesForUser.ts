import { Message } from '@communecar/types';

const messages: Message[] = [
  {
    id: '1',
    time: new Date(Date.now() + 120 * 60000),
    type: 'editRide',
    entityName: 'Tel-Aviv',
    userNameRequest: 'zoe',
    addresseeUserId: ['123'],
  },
  {
    id: '2',
    time: new Date(Date.now() + 120 * 60000),
    type: 'joiningCommunityRequest',
    entityName: 'Tel-Aviv',
    userNameRequest: 'zoe',
    addresseeUserId: ['123', 'admin'],
  },
  {
    id: '3',
    time: new Date(Date.now() + 120 * 60000),
    type: 'joiningRideRequest',
    entityName: 'to work',
    userNameRequest: 'zoe',
    addresseeUserId: ['123', 'admin'],
  },
];

const fetchMessagesForUser = async (userId: string) => {
  const messagesForUser = messages.filter((message) =>
    message.addresseeUserId.includes(userId),
  );

  return messagesForUser;
};

export { fetchMessagesForUser };
