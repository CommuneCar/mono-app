import { isEmpty } from 'lodash';
import { Gender, User } from '@communecar/types';

import { graphqlRequest } from '../graphql';

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
        gender: Gender;
        age: number;
      }[];
    };
  }>(getAllUserQuery);

  if (isEmpty(usersResponse)) {
    throw new Error('User not found.');
  }

  const user = usersResponse.allUsers.nodes[0];

  return {
    ...user,
    password,
    id: `${user.id}`,
    gander: user.gender,
    phone: user.phoneNumber,
  };
};

export { authenticateUser };
