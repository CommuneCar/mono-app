import { Gander, Message, User } from '@communecar/types';

const users: User[] = [
  {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.il',
    password: '123',
    gander: Gander.MALE,
    phone: '0500000000',
    age: 20,
  },
  {
    id: '1234',
    firstName: 'Jin',
    lastName: 'Doe',
    email: 'jin@doe.il',
    password: '1234',
    gander: Gander.FEMALE,
    phone: '0500000001',
    age: 20,
  },
  {
    id: 'admin',
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@admin.il',
    password: 'admin',
    gander: Gander.OTHER,
    phone: '0500000001',
    age: 20,
  },
];

const messages: Message[] = [
  {
    id: '1',
    time: new Date(Date.now()), // Current time
    type: 'editRide',
    entityName: 'Tel-Aviv',
    userNameRequest: 'Zoe',
    addresseeUsers: [users[0]],
    creatorUser: users[1],
  },
  {
    id: '2',
    time: new Date(Date.now() - 86400000), // Yesterday
    type: 'joiningCommunityRequest',
    entityName: 'Tel-Aviv',
    userNameRequest: 'Zoe',
    addresseeUsers: [users[0], users[2]],
    creatorUser: users[1],
  },
  {
    id: '3',
    time: new Date(Date.now() - 2 * 86400000), // 2 days ago
    type: 'joiningRideRequest',
    entityName: 'to work',
    userNameRequest: 'Zoe',
    addresseeUsers: [users[0], users[2]],
    creatorUser: users[1],
  },
  {
    id: '4',
    time: new Date(Date.now() - 7 * 86400000), // Exactly one week ago
    type: 'approvedCommunityRequest',
    entityName: 'Tel-aviv',
    userNameRequest: 'Dar',
    addresseeUsers: [users[0], users[2]],
    creatorUser: users[1],
  },
  {
    id: '5',
    time: new Date(Date.now() - 15 * 86400000), // More than a week ago
    type: 'approvedRideRequest',
    entityName: 'to work',
    userNameRequest: 'Dar',
    addresseeUsers: [users[0], users[2]],
    creatorUser: users[1],
  },
];

const fetchMessagesForUser = async (userId: string) => {
  const messagesForUser = messages.filter((message) => {
    const usersIds = message.addresseeUsers.map((user) => user.id);
    return usersIds.includes(userId);
  });

  return messagesForUser;
};

export { fetchMessagesForUser };
