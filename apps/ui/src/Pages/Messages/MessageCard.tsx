import { Message } from '@communecar/types';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
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
    <ListItem divider>
      <ListItemAvatar>
        <Avatar
          src="/path/to/avatar.jpg"
          alt={`${message.userNameRequest} avatar`}
        >
          {/* Display initials if no image */}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={messageText}
        secondary={`Time: ${formatDateRelative(message.time)}`}
      />
      <ListItemSecondaryAction>
        {isRequestType && (
          <Box>
            <Button
              color="primary"
              onClick={handleAccept}
              sx={{ marginRight: 1 }}
            >
              Accept
            </Button>
            <Button color="secondary" onClick={handleDecline}>
              Decline
            </Button>
          </Box>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { MessageCard };
