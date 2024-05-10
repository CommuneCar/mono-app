import { Message } from '@communecar/types';

const messages: Message[] = [
  {
    id: '1',
    time: new Date(Date.now()), // Current time
    type: 'editRide',
    entityName: 'Tel-Aviv',
    userNameRequest: 'Zoe',
    addresseeUserId: ['123'],
  },
  {
    id: '2',
    time: new Date(Date.now() - 86400000), // Yesterday
    type: 'joiningCommunityRequest',
    entityName: 'Tel-Aviv',
    userNameRequest: 'Zoe',
    addresseeUserId: ['123', 'admin'],
  },
  {
    id: '3',
    time: new Date(Date.now() - 2 * 86400000), // 2 days ago
    type: 'joiningRideRequest',
    entityName: 'to work',
    userNameRequest: 'Zoe',
    addresseeUserId: ['123', 'admin'],
  },
  {
    id: '4',
    time: new Date(Date.now() - 7 * 86400000), // Exactly one week ago
    type: 'approvedCommunityRequest',
    entityName: 'Tel-aviv',
    userNameRequest: 'Dar',
    addresseeUserId: ['123', 'admin'],
  },
  {
    id: '5',
    time: new Date(Date.now() - 15 * 86400000), // More than a week ago
    type: 'approvedRideRequest',
    entityName: 'to work',
    userNameRequest: 'Dar',
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
