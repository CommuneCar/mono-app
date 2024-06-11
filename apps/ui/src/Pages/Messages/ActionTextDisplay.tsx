import { Message, MessageType } from '@communecar/types';
import { BoldText } from '../../Components/styles/BoldText.styled';

const actionTextDisplay = (message: Message, isMyRequest: boolean) => {
  const entityNameTextStyle = (
    <BoldText>{` "${message.entityName}" `}</BoldText>
  );
  const actionsDisplay: Record<MessageType, JSX.Element> = {
    approvedCommunityRequest: (
      <>
        you have been approved to join the
        {entityNameTextStyle}
        community
      </>
    ),
    approvedRideRequest: (
      <>
        your request to join the trip to
        {entityNameTextStyle}
        has been approved
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
        {isMyRequest ? 'your request to join the' : 'wants to join the '}
        {entityNameTextStyle}
        community
        {isMyRequest && ' is still pending.'}
      </>
    ),
    joiningRideRequest: (
      <>
        {isMyRequest
          ? 'your request to join the trip to '
          : 'asks to join the trip to '}
        {entityNameTextStyle}
        {isMyRequest && ' is still pending'}
      </>
    ),
    declinedCommunityRequest: (
      <>
        your request to join the
        {entityNameTextStyle}
        community has been declined
      </>
    ),
    declinedRideRequest: (
      <>
        your request to join the ride to
        {entityNameTextStyle}
        has been declined
      </>
    ),
  };
  return actionsDisplay[message.type];
};

export { actionTextDisplay };
