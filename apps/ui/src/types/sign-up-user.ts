import { User } from '@communecar/types';

export type SignUpUser = Omit<User, 'id'>;
