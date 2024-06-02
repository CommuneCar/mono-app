import { isEmpty } from 'lodash';
import { Box, List, Typography } from '@mui/material';

import { Message } from '@communecar/types';

import { Page } from '../HomePage/styles';
import { MessageCard } from './MessageCard';
import { useUser } from '../../hooks/Users/useUser';
import { DEFAULT_USER_ID } from '../../apis/utils/defaultConst';
import { PageHeader } from '../../Components/PageHeader/PageHeader';
import { PageLoader } from '../../Components/PageLoader/PageLoader';
import { useGetUserMessages } from '../../hooks/Messages/fetchMessagesForUser';

const MessagesFeed = () => {
  const { user } = useUser();
  const {
    refetch,
    data: messages,
    isLoading: loading,
    isError,
    error,
  } = useGetUserMessages(user?.id || DEFAULT_USER_ID);

  if (isError)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Page sx={{ width: '100%' }}>
      <PageHeader title="Inbox" />
      <PageLoader isLoading={loading} paddingTop={4} />
      <Box sx={{ width: '100%' }}>
        {(isEmpty(messages) || !messages) && !loading ? (
          <Box>
            <Typography>You have no messages at the moment :(</Typography>
          </Box>
        ) : (
          <List>
            {messages?.map((message: Message) => (
              <MessageCard
                message={message}
                key={message.id}
                onActionComplete={() => refetch()}
              />
            ))}
          </List>
        )}
      </Box>
    </Page>
  );
};

export { MessagesFeed };
