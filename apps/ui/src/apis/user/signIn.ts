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
          phoneNumber
          gender
          password
          age
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
        phoneNumber: string;
        password: string;
        gender: Gender;
        age: number;
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
  return {
    ...user,
    phone: user.phoneNumber,
  };
};

export { authenticateUser };
