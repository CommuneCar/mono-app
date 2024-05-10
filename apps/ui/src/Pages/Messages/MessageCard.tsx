import { Message } from '@communecar/types';
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';

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
        primary={`${message.userNameRequest} is requesting to ${message.type
          .replace(/([A-Z])/g, ' $1')
          .toLowerCase()
          .trim()} for ${message.entityName}`}
        secondary={`Time: ${new Date(message.time).toLocaleString()}`}
      />
      <ListItemSecondaryAction>
        <Button color="primary" onClick={handleAccept} sx={{ marginRight: 1 }}>
          Accept
        </Button>
        <Button color="secondary" onClick={handleDecline}>
          Decline
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export { MessageCard };
