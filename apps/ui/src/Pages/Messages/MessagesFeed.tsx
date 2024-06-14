import { Dictionary, groupBy, isEmpty } from 'lodash';
import { Box, List, Typography } from '@mui/material';

import { Message } from '@communecar/types';

import { Page, PageHeaderBar } from '../HomePage/styles';
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

  const messagesByType: Dictionary<Message[]> = groupBy(messages, (message) => {
    if (message.creatorUser.id === user?.id) {
      return 'My Requests';
    }

    if (message.type.includes('Community')) {
      return 'Community Requests';
    }

    if (message.type.includes('Ride')) {
      return 'Ride Requests';
    }
  });

  return (
    <Page>
      <PageHeaderBar>
        <PageHeader title="Inbox" />
      </PageHeaderBar>
      <PageLoader isLoading={loading} paddingTop={4} />
      <Box sx={{ width: '100%' }}>
        {(isEmpty(messages) || !messages) && !loading ? (
          <Box>
            <Typography>You have no messages at the moment :(</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowY: 'auto', maxHeight: '80%' }}>
            {Object.entries(messagesByType).map(([key, messages]) => {
              return (
                <Box key={messages[0].id}>
                  <Box
                    sx={{
                      mx: '16px',
                      display: 'flex',
                      borderBottom: 'solid 1px #e0e0e0',
                    }}
                  >
                    <Typography>{key}</Typography>
                  </Box>
                  <List sx={{ overflowY: 'auto', maxHeight: '350px' }}>
                    {messages?.map((message: Message) => (
                      <MessageCard
                        key={message.id}
                        message={message}
                        onActionComplete={() => refetch()}
                        isMyRequest={key === 'My Requests'}
                      />
                    ))}
                  </List>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Page>
  );
};

export { MessagesFeed };
