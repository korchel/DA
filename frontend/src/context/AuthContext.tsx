import { createContext, useState, useContext, ReactNode } from 'react';
import { RoleName } from '../interfaces/interfaces';

interface ICurrentUser {
  roles: RoleName[];
  id: number | null;
  userName: string | null;
}

interface IAuthContext {
  logIn: (data) => void;
  logOut: () => void;
  isAuthenticated: boolean;
  currentUser: ICurrentUser;
}

const initialContext = {
  logIn: () => undefined,
  logOut: () => undefined,
  isAuthenticated: false,
  currentUser: {
    roles: [],
    id: null,
    userName: null,
  },
};

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({
    roles: [],
    id: null,
    userName: null,
  });

  const logIn = (currentUser: ICurrentUser) => {
    setCurrentUser(currentUser);
    setIsAuthenticated(true);
  };
  const logOut = () => {
    setIsAuthenticated(false);
  };

  const value = {
    logIn,
    logOut,
    isAuthenticated,
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext) as IAuthContext;

export { AuthProvider, useAuth };
