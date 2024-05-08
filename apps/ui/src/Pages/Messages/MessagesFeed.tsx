import { Stack } from '@mui/material';
import { useGetMessages } from '../../hooks/Messages/useGetMessages';

const MessagesFeed = () => {
  const { messages } = useGetMessages('id');
  return <Stack />;
};

export { MessagesFeed };
