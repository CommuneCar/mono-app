import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Gander, User } from '@communecar/types';

type UserContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  error: string | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      const userData: User = await authenticateUser(email, password);
      setUser(userData);
      setError(null);
      return true;
    } catch (error) {
      console.error('Failed to sign in:', error);
      setError('Authentication failed, please check your credentials.');
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, error }}>
      {children}
    </UserContext.Provider>
  );
};

async function authenticateUser(
  email: string,
  password: string,
): Promise<User> {
  return {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email,
    password,
    gander: Gander.MALE,
    phoneNumber: '000',
    age: 20,
  };

  // throw new Error('User not found.'); //TODO
}

export { useUser, UserProvider };
