import { UserStatus } from '@communetypes/Enums';
import {
  getCreateUserCommunityStatusQuery,
  getDeleteUserCommunityStatusQuery,
} from '../utils/userCommunityQueries';
import { graphqlRequest } from '../graphql';

const createUserCommunityStatus = async (
  userId: number,
  communityId: number,
  status: UserStatus,
) => {
  const query = getCreateUserCommunityStatusQuery(userId, communityId, status);
  const response = await graphqlRequest(query);
  return response;
};

const deleteUserCommunityStatus = async (
  userId: number,
  communityId: number,
) => {
  const query = getDeleteUserCommunityStatusQuery(userId, communityId);
  const response = await graphqlRequest(query);
  return response;
};

export { deleteUserCommunityStatus, createUserCommunityStatus };
