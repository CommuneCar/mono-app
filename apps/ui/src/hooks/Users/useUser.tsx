import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Gander, User } from '@communecar/types';

const UserContext = createContext<User | undefined>(undefined);

const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      // TODO
      const userData: User = await getUserFromServer();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// TODO: Dummy function
async function getUserFromServer(): Promise<User> {
  return {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gander: Gander.MALE,
    password: '123',
    phoneNumber: '0552508789',
    age: 22,
  };
}

export { useUser, UserProvider };
