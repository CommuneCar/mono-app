import { Message } from '@communecar/types';

const messages: Message[] = [
  {
    id: '1',
    time: new Date(Date.now() + 120 * 60000),
    type: 'joiningRequest',
    entityName: 'Tel-Aviv',
    userNameRequest: 'zoe',
  },
];

const useGetMessages = (userId: string) => {
  return { messages };
};

export { useGetMessages };
