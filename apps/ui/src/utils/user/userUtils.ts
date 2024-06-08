import { User } from '@communecar/types';

const getUserFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

export { getUserFullName };
