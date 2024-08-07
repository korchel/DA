import { createContext, useState, useContext, ReactNode, FC } from "react";
import Cookies from "js-cookie";
import { Role, RoleName } from "../interfaces/interfaces";

// interface userData {
//   jwtToken: string,
//   user: {
//     email: string,
//     idUser: number,
//     userName: string,
//     name: string,
//     roles: {
//       idRole: number,
//       name: Role,
//     }
//   }
// }

interface ICurrentUser {
  roles: RoleName[];
  id: string;
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
    roles: ["ROLE_USER" as RoleName],
    id: '',
  },
}

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({ roles: ["ROLE_USER" as RoleName], id: ''});

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