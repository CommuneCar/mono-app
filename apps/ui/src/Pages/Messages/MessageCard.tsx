import {
  Box,
  Avatar,
  Button,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
} from '@mui/material';

import { Message, MessageType } from '@communecar/types';

import { RequestActions } from '../../types/actions';
import { actionTextDisplay } from './ActionTextDisplay';
import { BoldText } from '../../Components/styles/BoldText.styled';
import { formatDateRelative } from '../../utils/format/formatDateRelative';
import { useRespondToMessage } from '../../hooks/Messages/useRespondToMessage';

export interface MessageCardProps {
  isMyRequest: boolean;
  message: Message;
  onActionComplete: (messageId: string, success: boolean) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isMyRequest,
  onActionComplete,
}) => {
  const { mutateAsync: submitRespondToMessage, isLoading } =
    useRespondToMessage();

  const isRequestType = [
    MessageType.JOINING_COMMUNITY_REQUEST,
    MessageType.JOINING_RIDE_REQUEST,
  ].includes(message.type);

  const messageText = (
    <>
      <BoldText>{`${message.creatorUser.firstName} `}</BoldText>
      {actionTextDisplay(message, isMyRequest)}
    </>
  );

  return (
    <ListItem
      divider
      sx={{ alignItems: 'flex-start', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar
            src={message.creatorUser.avatarUrl || undefined}
            alt={`${message.creatorUser?.firstName}'s avatar`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="body1">{messageText}</Typography>}
          secondary={
            <Typography variant="body2" color="textSecondary">
              {formatDateRelative(message.time)}
            </Typography>
          }
          primaryTypographyProps={{ component: 'div' }}
        />
      </Box>
      {isRequestType && !isMyRequest && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bottom: 0,
            textTransform: 'none',
          }}
        >
          <Button
            color="primary"
            onClick={async () => {
              const success = await submitRespondToMessage({
                message,
                action: RequestActions.ACCEPT,
              });
              onActionComplete(message.id, success);
            }}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            {RequestActions.ACCEPT}
          </Button>
          <Button
            color="secondary"
            onClick={async () => {
              const success = await submitRespondToMessage({
                message,
                action: RequestActions.DECLINE,
              });
              onActionComplete(message.id, success);
            }}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            {RequestActions.DECLINE}
          </Button>
          {isLoading && <CircularProgress size={24} />}
        </Box>
      )}
    </ListItem>
  );
};

export { MessageCard };
