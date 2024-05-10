import { Message } from '@communecar/types';

const messages: Message[] = [
  {
    id: '1',
    time: new Date(Date.now() + 120 * 60000),
    type: 'editRide',
    entityName: 'Tel-Aviv',
    userNameRequest: 'zoe',
  },
  {
    id: '1',
    time: new Date(Date.now() + 120 * 60000),
    type: 'joiningCommunityRequest',
    entityName: 'Tel-Aviv',
    userNameRequest: 'zoe',
  },
];

const useGetMessages = (userId: string) => {
  console.log(userId);

  return { messages };
};

export { useGetMessages };
