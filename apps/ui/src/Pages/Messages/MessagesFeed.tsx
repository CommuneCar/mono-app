import { Box } from '@mui/material';
import { useGetMessages } from '../../hooks/Messages/useGetMessages';
import { useUser } from '../../hooks/Users/useUser';

const MessagesFeed = () => {
  const { user } = useUser();
  const { messages } = useGetMessages(user?.id || 'admin');
  return (
    <Box>
      {messages.map((message) => (
        <p>{message.type}</p>
      ))}
    </Box>
  );
};

export { MessagesFeed };
