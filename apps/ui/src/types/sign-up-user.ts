import { User } from '@communecar/types';
import { Dayjs } from 'dayjs';

export type SignUpUser = Omit<Omit<User, 'id'>, 'age'> & { age: Dayjs };
