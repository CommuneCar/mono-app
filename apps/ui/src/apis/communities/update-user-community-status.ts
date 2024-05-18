import { UserStatus } from '@communetypes/Enums';
import {
  queryCreateUserCommunityStatus,
  queryDeleteUserCommunityStatus,
} from '../utils/userCommunityQueries';
import { graphqlRequest } from '../graphql';

const createUserCommunityStatus = async (
  userId: number,
  communityId: number,
  status: UserStatus,
) => {
  const query = queryCreateUserCommunityStatus(userId, communityId, status);
  const response = await graphqlRequest(query);
  return response;
};

const deleteUserCommunityStatus = async (
  userId: number,
  communityId: number,
) => {
  const query = queryDeleteUserCommunityStatus(userId, communityId);
  const response = await graphqlRequest(query);
  return response;
};

export { deleteUserCommunityStatus, createUserCommunityStatus };
