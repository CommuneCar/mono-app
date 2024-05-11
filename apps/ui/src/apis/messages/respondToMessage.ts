import { RequsetActions } from '../../types/actions';

const respondToMessage = async (messageId: string, action: RequsetActions) => {
  //TODO: if decline need to post a message to the creator user
  return { messageId, action };
};

export { respondToMessage };
