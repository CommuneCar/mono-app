import { isEmpty } from 'lodash';
import { Gender, User } from '@communecar/types';

import { graphqlRequest } from '../graphql';

const authenticateUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const getAllUserQuery = `{
      allUsers{
        nodes{
          id
          email
        }
      }
  }`;

  const allUsers = await graphqlRequest<{
    allUsers: { nodes: { id: number; email: string }[] };
  }>(getAllUserQuery);

  const userId = allUsers.allUsers.nodes.filter((node) => node.email === email);

  if (isEmpty(userId)) {
    throw new Error('User not found.');
  }

  const getUserQuery = `{
    userById(id: ${userId[0].id}){
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      age
    }
  }`;

  const { userById } = await graphqlRequest<{
    userById: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      gender: Gender;
      age: number;
    };
  }>(getUserQuery);

  return {
    ...userById,
    id: `${userById.id}`,
    phone: userById.phoneNumber,
    password,
    gander: userById.gender,
  };
};

export { authenticateUser };
