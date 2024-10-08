import { isNil } from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

import { Gender, User } from '@communecar/types';

import { hashString } from './utils';
import { axiosClient } from '../client';
import { graphqlRequest } from '../graphql';
import { SignUpUser } from '../../types/sign-up-user';

const handleAge = (birthdate: Dayjs | null) => {
  if (!isNil(birthdate)) {
    const today = dayjs();
    const age = today.diff(birthdate, 'year');

    if (today.isBefore(birthdate.add(age, 'year'))) {
      return age - 1;
    }

    return age;
  }
};

const singUpNewUser = async (newUser: SignUpUser): Promise<User> => {
  const {
    age,
    email,
    phone,
    gender,
    lastName,
    password,
    firstName,
    avatarUrl,
  } = newUser;

  const hashedPassword = await hashString(password);

  const newUserQuery = `mutation {
    createUser(input: {
      user: {
        firstName: "${firstName}",
        lastName: "${lastName}",
        email: "${email}",
        profileImage: "${avatarUrl}",
        age: ${handleAge(age)},
        gender: "${gender}",
        phoneNumber: "${phone}"
        password: "${hashedPassword}"
      }
    }) {
      user {
        id
        firstName
        lastName
        email
        avatarUrl: profileImage
        age
        gender
        phoneNumber
        password
      }
    }
  }`;

  try {
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
          password: string;
        };
      };
    }>(newUserQuery);

    const { user: userResponse } = newUserResponse.createUser;

    return {
      ...userResponse,
      phone: userResponse.phoneNumber,
      gender: userResponse.gender as Gender,
    };
  } catch (error: any) {
    if (error.message.includes('duplicate key value')) {
      throw new Error(
        'This email or phone number is already taken. Please sign up with a unique email and phone number.',
      );
    } else {
      throw new Error(
        'An unexpected error occurred during signup. Please try again.',
      );
    }
  }
};

const uploadImage = async (formData: FormData) => {
  try {
    return await axiosClient.post<{ image: string }>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: unknown) {
    console.error(error);
    throw new Error('Error in uploading the image');
  }
};

export { singUpNewUser, uploadImage };
