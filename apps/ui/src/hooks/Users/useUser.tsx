import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Gander, User } from '@communecar/types';

type UserContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const UserContext = createContext<
  | {
      user: User | null;
      signIn: (email: string, password: string) => Promise<void>;
      signOut: () => void;
    }
  | undefined
>(undefined);

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

  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call to authenticate user
      const userData: User = await authenticateUser(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Failed to sign in:', error);
      // Handle errors (e.g., show error message)
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
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
}

export { useUser, UserProvider };
