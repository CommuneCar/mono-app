import { Box, CircularProgress, List, Typography } from '@mui/material';
import { useUserMessages } from '../../hooks/Messages/useMessagesForUser';
import { useUser } from '../../hooks/Users/useUser';
import { Message } from '@communecar/types';
import { MessageCard } from './MessageCard';

import { PageHeader } from '../../Components/PageHeader/PageHeader';

const MessagesFeed = () => {
  const { user } = useUser();
  const { messages, loading, error, setMessages } = useUserMessages(
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
      <PageHeader title="Inbox" />
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
