import { Message } from '@communecar/types';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatDateRelative } from '../../utils/format/formatDateRelative';

export interface MessageCardProps {
  message: Message;
  onActionComplete: (messageId: string) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onActionComplete,
}) => {
  const handleAccept = () => {
    alert('Action Accepted!');
    onActionComplete(message.id);
  };

  const handleDecline = () => {
    alert('Action Declined!');
    onActionComplete(message.id);
  };

  const isRequestType =
    message.type === 'joiningRideRequest' ||
    message.type === 'joiningCommunityRequest' ||
    message.type === 'editRide';

  const actionText = message.type
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim();

  const messageText = (
    <>
      <strong>{message.creatorUser.firstName}</strong>
      {isRequestType
        ? ` is requesting to ${actionText} for `
        : ` ${actionText} to join `}
      <strong>"{message.entityName}"</strong>
    </>
  );

  return (
    <ListItem
      divider
      sx={{ alignItems: 'flex-start', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar alt={`${message.creatorUser.firstName}'s avatar`} />
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
          }}
        >
          <Button color="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Button color="secondary" onClick={handleDecline}>
            Decline
          </Button>
        </Box>
      )}
    </ListItem>
  );
};

export { MessageCard };
