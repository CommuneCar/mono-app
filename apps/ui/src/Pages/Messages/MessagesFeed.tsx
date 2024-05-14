import { Box, Button, CircularProgress, List, Typography } from '@mui/material';
import { useUserMessages } from '../../hooks/Messages/useMessagesForUser';
import { useUser } from '../../hooks/Users/useUser';
import { Message } from '@communecar/types';
import { MessageCard } from './MessageCard';
import { Menu } from '../../Components/Menu/Menu';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Header } from '../../Components/styles/Header.styled';
import { Page } from '../../Components/styles/Page.styled';

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
    <Page>
      <Box sx={{ paddingLeft: '1%', paddingRight: '1%' }}>
        <Header>
          <Typography
            textTransform="uppercase"
            sx={{ letterSpacing: '0.15rem' }}
          >
            Inbox
          </Typography>
          <Menu
            MenuButton={
              <Button sx={{ height: '100%' }} color="primary">
                <MenuIcon />
              </Button>
            }
          />
        </Header>
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
    </Page>
  );
};

export { MessagesFeed };
