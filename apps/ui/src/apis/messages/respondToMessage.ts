import { RequestActions } from '../../types/actions';

const respondToMessage = async (messageId: string, action: RequestActions) => {
  //TODO: if decline need to post a message to the creator user
  //TODO: handle if the ride is full already
  return { messageId, action };
};

export { respondToMessage };
