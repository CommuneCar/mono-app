import { Message, MessageType } from '@communecar/types';
import { RequestActions } from '../../types/actions';
import {
  acceptJoinCommunityRequest,
  declineJoinCommunityRequest,
} from './joinCommunityRequest';

const respondToMessage = async (message: Message, action: RequestActions) => {
  return typeToAction[message.type](message, action);
};

const typeToAction: Record<
  MessageType,
  (message: Message, action: RequestActions) => void
> = {
  [MessageType.JOINING_COMMUNITY_REQUEST]: async (
    message: Message,
    action: RequestActions,
  ) => {
    const actions = {
      [RequestActions.ACCEPT]: acceptJoinCommunityRequest,
      [RequestActions.DECLINE]: declineJoinCommunityRequest,
    };

    return actions[action](message);
  },
  [MessageType.EDIT_RIDE]: (message: Message, action: RequestActions): void => {
    console.log(message.id, action);
  },
  [MessageType.JOINING_RIDE_REQUEST]: (
    message: Message,
    action: RequestActions,
  ): void => {
    console.log(message.id, action);
  },
  [MessageType.APPROVED_COMMUNITY_REQUEST]: (
    message: Message,
    action: RequestActions,
  ): void => {
    console.log(message.id, action);
  },
  [MessageType.APPROVED_RIDE_REQUEST]: (
    message: Message,
    action: RequestActions,
  ): void => {
    console.log(message.id, action);
  },
  [MessageType.DECLINE_COMMUNITY_REQUEST]: (
    message: Message,
    action: RequestActions,
  ): void => {
    console.log(message.id, action);
  },
  [MessageType.DECLINE_RIDE_REQUEST]: (
    message: Message,
    action: RequestActions,
  ): void => {
    console.log(message.id, action);
  },
};

export { respondToMessage };
