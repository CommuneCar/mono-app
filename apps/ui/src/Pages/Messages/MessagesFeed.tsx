import { Box, CircularProgress, List, Typography } from '@mui/material';
import { useMessagesForUser } from '../../hooks/Messages/useMessagesForUser';
import { useUser } from '../../hooks/Users/useUser';
import { Message } from '@communecar/types';
import { MessageCard } from './MessageCard';

const MessagesFeed = () => {
  const { user } = useUser();
  const { messages, loading, error, setMessages } = useMessagesForUser(
    user?.id || 'admin',
  );

  const handleActionComplete = (messageId: string, success: boolean) => {
    if (success) setMessages(messages.filter((msg) => msg.id !== messageId));
  };

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography textTransform="uppercase" sx={{ letterSpacing: '0.15rem' }}>
        Inbox
      </Typography>
      <List>
        {messages.map((message: Message) => (
          <MessageCard
            message={message}
            key={message.id}
            onActionComplete={handleActionComplete}
          />
        ))}
      </List>
    </Box>
  );
};

export { MessagesFeed };
