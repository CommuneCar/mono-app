import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@communecar/types';

const UserContext = createContext<
  | {
      user: User | null;
      signIn: (user: User) => void;
      signOut: () => void;
    }
  | undefined
>(undefined);

const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (userData: User) => {
    setUser(userData);
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

export { useUser, UserProvider };
