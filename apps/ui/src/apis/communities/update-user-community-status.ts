import { UserStatus } from '@communetypes/Enums';
import {
  getCreateUserCommunityStatusQuery,
  getDeleteUserCommunityStatusQuery,
  getUpdateUserCommunityStatusQuery,
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

//TODO: check if needed
const deleteUserCommunityStatus = async (
  userId: number,
  communityId: number,
) => {
  const query = getDeleteUserCommunityStatusQuery(userId, communityId);
  const response = await graphqlRequest(query);
  return response;
};

const updateUserCommunityStatus = async (
  userId: number,
  communityId: number,
  status: UserStatus,
) => {
  const query = getUpdateUserCommunityStatusQuery(userId, communityId, status);
  const response = await graphqlRequest(query);
  return response;
};

export {
  deleteUserCommunityStatus,
  createUserCommunityStatus,
  updateUserCommunityStatus,
};
