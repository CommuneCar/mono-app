import { User } from '@communecar/types';
import { SignUpUser } from '../../types/sign-up-user';

const singUpNewUser = async (newUser: SignUpUser): Promise<User> => {
  const user: User = { ...newUser, ['id']: '2' };
  return user;
};

export { singUpNewUser };
