import { isEmpty } from 'lodash';
import { Box, CircularProgress, List, Typography } from '@mui/material';

import { Message } from '@communecar/types';

import { Page } from '../HomePage/styles';
import { MessageCard } from './MessageCard';
import { useUser } from '../../hooks/Users/useUser';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import { useGetUserMessages } from '../../apis/messages/fetchMessagesForUser';

const MessagesFeed = () => {
  const { user } = useUser();
  const {
    data: messages,
    isLoading: loading,
    isError,
    error,
  } = useGetUserMessages(user?.id || 1);

  const handleActionComplete = (messageId: string, success: boolean) => {
    console.log(messageId, success);
  };

  if (loading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Page>
      <PageHeader title="Inbox" />
      <Box sx={{ width: '100%' }}>
        {isEmpty(messages) || !messages ? (
          <Box>
            <Typography>
              It appears you have no new messages right now :(
            </Typography>
          </Box>
        ) : (
          <List>
            {messages.map((message: Message) => (
              <MessageCard
                message={message}
                key={message.id}
                onActionComplete={handleActionComplete}
              />
            ))}
          </List>
        )}
      </Box>
    </Page>
  );
};

export { MessagesFeed };
