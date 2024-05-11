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
import { RequsetActions } from '../../types/actions';
import { useRespondToMessage } from '../../hooks/Messages/useRespondToMessage';

export interface MessageCardProps {
  message: Message;
  onActionComplete: (messageId: string, success: boolean) => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  onActionComplete,
}) => {
  const { submitRespondToMessage, isLoading, error } = useRespondToMessage();

  const handleAction = async (action: RequsetActions) => {
    const success = await submitRespondToMessage(message.id, action);
    if (success && !isLoading) {
      alert(`Action ${action} was successful!`);
      onActionComplete(message.id, true);
    } else {
      alert(`Failed to ${action} the request: ${error?.message}`);
    }
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
          <Button
            color="primary"
            onClick={() => handleAction(RequsetActions.ACCEPT)}
          >
            {RequsetActions.ACCEPT}
          </Button>
          <Button
            color="secondary"
            onClick={() => handleAction(RequsetActions.DECLINE)}
          >
            {RequsetActions.DECLINE}
          </Button>
        </Box>
      )}
    </ListItem>
  );
};

export { MessageCard };
