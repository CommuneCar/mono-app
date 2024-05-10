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

  const messageText = isRequestType
    ? `${message.userNameRequest} is requesting to ${message.type
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim()} for "${message.entityName}"`
    : `${message.userNameRequest} ${message.type
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim()} for "${message.entityName}"`;

  return (
    <ListItem
      divider
      sx={{ alignItems: 'flex-start', flexDirection: 'column' }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar
            src="/path/to/avatar.jpg" // Replace with actual source if available
            alt={`${message.userNameRequest}'s avatar`}
          />
        </ListItemAvatar>
        <ListItemText
          primary={messageText}
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
