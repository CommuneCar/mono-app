import { Message, MessageType } from '@communecar/types';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatDateRelative } from '../../utils/format/formatDateRelative';
import { RequestActions } from '../../types/actions';
import { useRespondToMessage } from '../../hooks/Messages/useRespondToMessage';
import { actionTextDisplay } from './ActionTextDisplay';
import { BoldText } from '../../Components/styles/BoldText.styled';

export interface MessageCardProps {
  message: Message;
  onActionComplete: (messageId: string, success: boolean) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onActionComplete,
}) => {
  const { submitRespondToMessage, isLoading, error } = useRespondToMessage();

  const handleAction = async (action: RequestActions) => {
    const success = await submitRespondToMessage(message.id, action);
    if (success && !isLoading) {
      alert(`Action ${action} was successful!`);
      onActionComplete(message.id, true);
    } else {
      alert(`Failed to ${action} the request: ${error?.message}`);
    }
  };

  const isRequestType = [
    MessageType.JOINING_COMMUNITY_REQUEST,
    MessageType.JOINING_RIDE_REQUEST,
  ].includes(message.type);

  const messageText = (
    <>
      <BoldText>{`${message.creatorUser.firstName} `}</BoldText>
      {actionTextDisplay(message)}
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
      {isRequestType && (
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
            onClick={() => handleAction(RequestActions.ACCEPT)}
            disabled={isLoading}
            sx={{ textTransform: 'none' }}
          >
            {RequestActions.ACCEPT}
          </Button>
          <Button
            color="secondary"
            onClick={() => handleAction(RequestActions.DECLINE)}
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
