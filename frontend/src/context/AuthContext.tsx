import { createContext, useState, useContext, ReactNode, FC } from "react";
import Cookies from "js-cookie";
import { Role } from "../interfaces/interfaces";

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

interface IAuthContext {
  logIn: (data) => void;
  logOut: () => void;
  isAuthenticated: boolean;
  currentUserRoles: Role[];
}

const initialContext = {
  logIn: () => undefined,
  logOut: () => undefined,
  isAuthenticated: false,
  currentUserRoles: ["ROLE_USER" as Role],
}

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUserRoles, setCurrentUserRoles] = useState<Role[]>([]);


  const logIn = (roles: Role[]) => {
    setCurrentUserRoles(roles);
    setIsAuthenticated(true);
  };
  const logOut = () => {
    setIsAuthenticated(false);
  };

  const value = {
    logIn,
    logOut,
    isAuthenticated,
    currentUserRoles,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext) as IAuthContext;

export { AuthProvider, useAuth };