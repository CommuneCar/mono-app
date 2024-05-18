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

import { TEXT } from '../../themes/default/consts';
import { RequestActions } from '../../types/actions';
import { actionTextDisplay } from './ActionTextDisplay';
import { useSnackbar } from '../../contexts/SnackbarContext';
import { BoldText } from '../../Components/styles/BoldText.styled';
import { formatDateRelative } from '../../utils/format/formatDateRelative';
import { useRespondToMessage } from '../../hooks/Messages/useRespondToMessage';

export interface MessageCardProps {
  message: Message;
  onActionComplete: (messageId: string, success: boolean) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onActionComplete,
}) => {
  const { showMessage } = useSnackbar();

  const { submitRespondToMessage, isLoading, error } = useRespondToMessage();

  const handleAction = async (action: RequestActions) => {
    const success = await submitRespondToMessage(message, action);
    if (success && !isLoading) {
      showMessage(TEXT.alerts.SUCCESSFUL_REQUEST, 'success');
      onActionComplete(message.id, true);
    } else {
      showMessage(
        `Failed to ${action} the request: ${error?.message}`,
        'error',
      );
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
