import { Message, MessageType } from '@communecar/types';
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
    message.type === MessageType.JOINING_COMMUNITY_REQUEST ||
    message.type === MessageType.JOINING_RIDE_REQUEST;

  const entityNameTextStyle = <strong>{` "${message.entityName}" `}</strong>;

  const actionText = {
    approvedCommunityRequest: (
      <>
        {`has approved your request to join the `}
        {entityNameTextStyle}
        community
      </>
    ),
    approvedRideRequest: (
      <>
        approved your request to join the trip to
        {entityNameTextStyle}
      </>
    ),
    editRide: (
      <>
        edited the trip to
        {entityNameTextStyle}
      </>
    ),
    joiningCommunityRequest: (
      <>
        {`wants to join the `}
        {entityNameTextStyle}
        community
      </>
    ),
    joiningRideRequest: (
      <>
        asks to join the trip to
        {entityNameTextStyle}
      </>
    ),
  };

  const messageText = (
    <>
      <strong>{`${message.creatorUser.firstName} `}</strong>
      {actionText[message.type]}
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
