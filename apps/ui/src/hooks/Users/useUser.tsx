import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '@communecar/types';
import { authenticateUser, singUpNewUser } from '../../apis/user/index';
import { SignUpUser } from '../../types/sign-up-user';
import { useSessionStorage } from 'react-use';

type UserContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  error: string | null;
  signUp: (newUser: SignUpUser) => Promise<boolean>;
  loading: boolean;
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
  const [user, setUser] = useSessionStorage<User | null>('user', null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
    sessionStorage.removeItem('user');
  };

  const signUp = async (newUser: SignUpUser) => {
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
    <UserContext.Provider
      value={{ user, signIn, signOut, signUp, error, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { useUser, UserProvider };
