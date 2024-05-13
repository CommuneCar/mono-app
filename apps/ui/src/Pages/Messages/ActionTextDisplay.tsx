import { Message, MessageType } from '@communecar/types';
import { BoldText } from '../../Components/styles/BoldText.styled';

const actionTextDisplay = (message: Message) => {
  const entityNameTextStyle = (
    <BoldText>{` "${message.entityName}" `}</BoldText>
  );
  const actionsDisplay: Record<MessageType, JSX.Element> = {
    approvedCommunityRequest: (
      <>
        has approved your request to join the
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
    declinedCommunityRequest: (
      <>
        has declined your request to join the
        {entityNameTextStyle}
        community
      </>
    ),
    declinedRideRequest: (
      <>
        declined your request to join the ride to
        {entityNameTextStyle}
      </>
    ),
  };
  return actionsDisplay[message.type];
};

export { actionTextDisplay };
