import { Gender, User } from '@communecar/types';

import { graphqlRequest } from '../graphql';
import { SignUpUser } from '../../types/sign-up-user';

const singUpNewUser = async (newUser: SignUpUser): Promise<User> => {
  const {
    age,
    email,
    phone,
    gander,
    lastName,
    password,
    firstName,
    avatarUrl,
  } = newUser;

  const newUserQuery = `mutation {
    createUser(input: {
      user: {
        firstName: "${firstName}",
        lastName: "${lastName}",
        email: "${email}",
        profileImage: "${avatarUrl}",
        age: ${age ?? 6},
        gender: "${gander}",
        phoneNumber: "${phone}"
      }
    }) {
      user {
        id
        firstName
        lastName
        email
        profileImage
        age
        gender
        phoneNumber
      }
    }
  }`;

  const newUserResponse = await graphqlRequest<{
    createUser: {
      user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
        age: number;
        gender: string;
        phoneNumber: string;
      };
    };
  }>(newUserQuery);

  const { user: userResponse } = newUserResponse.createUser;

  return {
    password,
    ...userResponse,
    phone: userResponse.phoneNumber,
    gander: userResponse.gender as Gender,
  };
};

export { singUpNewUser };
