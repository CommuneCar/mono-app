import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@communecar/types';
import { authenticateUser } from '../../apis/user/signIn';
import { singUpNewUser } from '../../apis/user/signUp';

type UserContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  error: string | null;
  signUp: (newUser: User) => Promise<boolean>;
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
      logInUser(userData);
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

  const signUp = async (newUser: User) => {
    try {
      const userData: User = await singUpNewUser(newUser);
      logInUser(userData);
      return true;
    } catch (error) {
      console.error('Failed to sign up:', error);
      setError('Sign Up Failed');
      return false;
    }
  };

  const logInUser = (userData: User) => {
    setUser(userData);
    setError(null);
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut, signUp, error }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
