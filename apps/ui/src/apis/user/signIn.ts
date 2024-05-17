import { Gander, User } from '@communecar/types';

const authenticateUser = async (
  email: string,
  password: string,
): Promise<User> => {
  return {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email,
    password,
    gander: Gander.MALE,
    phone: '000',
    age: 20,
  };

  // throw new Error('User not found.'); //TODO
};

export { authenticateUser };
