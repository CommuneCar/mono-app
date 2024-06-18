import { isEmpty } from 'lodash';
import { Gender, User } from '@communecar/types';

import { graphqlRequest } from '../graphql';
import { hashString } from './utils';

const authenticateUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const getAllUserQuery = `{
      allUsers(condition: {email: "${email}"}){
        nodes{
          id
          firstName
          lastName
          email
          phone: phoneNumber
          gender
          password
          age
          avatarUrl: profileImage
        }
      }
  }`;

  const usersResponse = await graphqlRequest<{
    allUsers: {
      nodes: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        password: string;
        gender: Gender;
        age: number;
        avatarUrl: string;
      }[];
    };
  }>(getAllUserQuery);

  if (isEmpty(usersResponse)) {
    throw new Error('User not found.');
  }

  const user = usersResponse.allUsers.nodes[0];
  const hashedPassword = await hashString(password);
  if (hashedPassword !== user.password) {
    throw new Error('password is not correct');
  }
  console.log('damn', user)
  return user;
};

export { authenticateUser };
